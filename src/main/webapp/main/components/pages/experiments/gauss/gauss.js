var backgroundColor = 'grey';
var diagramColor = 'blueDiagram';
var diagramBorder = '';
var startTime;
var numberOfElements = 0;
var numberOfSources = 0;
var fullStatisticQuery = "SELECT sum_filled FROM statistic";
var allowedStatisticQuery = "SELECT SUM(filled) / COUNT(*) as 'sum_filled' FROM msg GROUP BY msg.`measure_date`";
var fullStatParametersQuery = "SELECT (param.max - param.min) / 10 AS 'gradY', param.max, param.min, param.expectedValue, POW(SUM(POW(normal.`sum_filled` - param.expectedValue,2))/param.number_of_elements,0.5) AS 'deviation' FROM (SELECT MAX(statistic.`sum_filled`) AS 'max', MIN(statistic.`sum_filled`) AS 'min', COUNT(*) AS 'number_of_elements', SUM(statistic.`sum_filled`) / COUNT(*) AS 'expectedValue' FROM statistic) AS param, statistic AS normal";
var allowedStatParametersQuery = "SELECT (param.max - param.min) / 10 AS 'gradY',param.max,param.min,param.expectedValue,POW(SUM(POW(normal.`number`-param.expectedValue,2))/param.number_of_elements,0.5) AS 'deviation' FROM (SELECT MAX(normal.`number`) AS 'max', MIN(normal.`number`) AS 'min', COUNT(*) AS 'number_of_elements', SUM(normal.`number`) / COUNT(*) AS 'expectedValue' FROM (SELECT SUM(filled)/COUNT(*) AS 'number' FROM msg GROUP BY measure_date) AS normal) AS param, (SELECT SUM(filled)/COUNT(*) AS 'number' FROM msg GROUP BY measure_date) AS normal";
var checkUserQuery = "SELECT getUserAuthority() as 'user_authority'";
var numberOfSourcesQuery = "SELECT getNumberOfSources() as 'number_of_sources'";
var numberOfAllowedSourcesQuery = "SELECT getNumberOfAllowedSources() as 'number_of_sources'";
function count(datasource) {
    startTime = new Date().getTime();
    numberOfElements = 0;
    numberOfSources = 0;
    var numbers;
    switch (datasource) {
        case "GENERATE" :
            var n = parseInt(document.getElementById("number_of_sources").value) || 0;
            var k = parseInt(document.getElementById("number_of_elements").value) || 0;
            if (n == 0 || k == 0) {
                alert("?????????? ??????? ??????!");
                return;
            }
            generate(n, k);
            break;
        case "MYSQL" :
            var requestUrl = document.getElementById("request_url").value;
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            if (!isValidUrl(requestUrl)) {
                alert("?????????? ??????? ??????!");
                return;
            }
            getDataFromDB(requestUrl, username, password);
            break;
    }
}
/*------------------ ?????????? ??????? ---------------------*/
function generate(numberOfSources, numberOfElements) {
    var uniformDistributionNumbersArray = generateUniformDistributionNumbers(numberOfSources, numberOfElements);
    var normalDistributedNumbers = [];
    for (var p = 0; p < numberOfElements; p++) {
        var sum = 0;
        for (var q = 0; q < numberOfSources; q++) {
            sum += uniformDistributionNumbersArray[q][p];
        }
        var average = sum / numberOfSources;
        normalDistributedNumbers.push(average);
    }
    fetchInformationAndShowData(normalDistributedNumbers);
}
function generateUniformDistributionNumbers(numberOfSources, numberOfElements) {
    var uniformDistributionNumbersArray = [];
    for (var i = 0; i < numberOfSources; i++) {
        var uniformDistributionNumbers = [];
        for (var j = 0; j < numberOfElements; j++) {
            uniformDistributionNumbers.push(Math.random() * 10);
        }
        uniformDistributionNumbersArray.push(uniformDistributionNumbers);
    }
    return uniformDistributionNumbersArray;
}
/*------------------ ?????? ?? ???? ?????? ---------------------*/
function getDataFromDB(requestUrl, username, password) {
    if (username == "") {
        username = "guest";
    }
    var queryMode = document.getElementById('query_mode').checked;
    var statisticQuery = queryMode ? allowedStatisticQuery : fullStatisticQuery;
    var parametersQuery = queryMode ? allowedStatParametersQuery : fullStatParametersQuery;
    sendRequest(statisticQuery, requestUrl, username, password, function (result) {
        var statistics = result;
        sendRequest(parametersQuery, requestUrl, username, password, function (result) {
            var params = result;
            var numbers = [];
            for (var i = 0; i < statistics.length; i++) {
                numbers.push(parseFloat(statistics[i]['sum_filled']));
            }
            showData(numbers, params[0]);
        });
    });
    var determine = document.getElementById('determine').checked;
    if (determine) {
        var query = queryMode ? numberOfAllowedSourcesQuery : numberOfSourcesQuery;
        sendRequest(query, requestUrl, username, password, function (result) {
            numberOfSources = result[0]['number_of_sources'];
        });
    }
}
function sendRequest(query, requestUrl, username, password, callback) {
    var xmlhttp;
    try {

        xmlhttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Your browser broke!");
                return false;
            }
        }
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.open("GET", requestUrl + "?query=" + query + "&username=" + username + "&password=" + password, true);
    xmlhttp.setRequestHeader("Origin", "localhost");
    xmlhttp.send();
}
function checkUserAuthority() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var requestUrl = document.getElementById("request_url").value;
    if (username == "") {
        username = "guest";
    }
    if (!isValidUrl(requestUrl)) {
        alert("?????????? ??????? ??????!");
        return;
    }
    sendRequest(checkUserQuery, requestUrl, username, password, function (result) {
        var authority = parseInt(result[0]['user_authority']);
        if (authority != 2) {
            document.getElementById("determine_option").style.display = 'block';
            if (authority == 1) {
                document.getElementById("determine").disabled = false;
            }
        }
        document.getElementById("query_mode").disabled = false;
        document.getElementById("count_mysql").disabled = false;
    });
}
function fetchInformationAndShowData(normalDistributedNumbers) {
    var sum = 0;
    for (var l = 0; l < normalDistributedNumbers.length; l++) {
        sum += normalDistributedNumbers[l];
    }
    var expectedValue = sum / normalDistributedNumbers.length;
    expectedValue = expectedValue.toFixed(2);
    sum = 0;
    for (var m = 0; m < normalDistributedNumbers.length; m++) {
        sum += Math.pow((normalDistributedNumbers[m] - expectedValue), 2);
    }
    var deviation = Math.sqrt((1 / normalDistributedNumbers.length) * sum);
    deviation = deviation.toFixed(2);
    var max = normalDistributedNumbers[0];
    var min = normalDistributedNumbers[0];
    for (var i = 0; i < normalDistributedNumbers.length; i++) {
        max = normalDistributedNumbers[i] > max ? normalDistributedNumbers[i] : max;
        min = normalDistributedNumbers[i] < min ? normalDistributedNumbers[i] : min;
    }
    var gradY = (max - min) / 10;
    var params = {min: min, expectedValue: expectedValue, deviation: deviation, gradY: gradY};
    showData(normalDistributedNumbers, params);
}
function countEntropy(count, array) {
    var entropy = 0;
    for (var i = 0; i < array.length; i++) {
        var p = array[i] / count;
        entropy += (p != 0) ? (-1) * p * Math.log(p) : 0;
    }
    return entropy.toFixed(2);
}
function showData(numbers, params) {
    clearResult();
    clearHistogram();
    if (numbers.length != 0) {
        numberOfElements = numbers.length;
        var min = parseFloat(params.min) || 0;
        var expectedValue = parseFloat(params.expectedValue) || 0;
        var deviation = parseFloat(params.deviation) || 0;
        var gradY = parseFloat(params.gradY) || 0;
        var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var k = 0; k < numbers.length; k++) {
            var round = Math.floor(numbers[k] / gradY - (min / gradY));
            array[(round == 10) ? 9 : round]++;
        }
        showHistogram(array, min, gradY);
        showResult(array, expectedValue, deviation);
        var determine = document.getElementById('determine').checked;
        if (determine) {
            document.getElementById("number_of_sources_read_only").value = numberOfSources;
            document.getElementById("number_of_elements_read_only").value = numberOfElements;
        }
    }
}
function showHistogram(array, min, gradY) {
    var maxValue = array.reduce(function (previous, current) {
        return previous > current ? previous : current;
    });
    var gradX = Math.floor(maxValue / 20) + 1;
    var xAxisCategories = document.getElementsByClassName('xAxisCategory');
    for (var p = 0; p < xAxisCategories.length - 1; p++) {
        xAxisCategories[p + 1].innerHTML = gradX * (p + 1);
    }
    var yAxisCategories = document.getElementsByClassName('yAxisCategory');
    var fixed = Math.abs(Math.floor(Math.log(gradY) / Math.LN10));
    for (var q = 0; q < yAxisCategories.length; q++) {
        yAxisCategories[(yAxisCategories.length - 1) - q].innerHTML = (min + gradY * q).toFixed(fixed);
    }
    for (var i = 1; i <= array.length; i++) {
        var j = Math.floor(array[i - 1] / gradX);
        var tds = document.getElementById('tr_' + i).children;
        if (j > 0) {
            for (var k = 0; k < j; k++) {
                tds[k + 2].className = "item fill " + diagramColor + " " + diagramBorder;
            }
        }
        tds[1].innerHTML = array[i - 1];
    }
}
function clearHistogram() {
    var xAxisCategories = document.getElementsByClassName('xAxisCategory');
    for (var z = 0; z < xAxisCategories.length - 1; z++) {
        xAxisCategories[z + 1].innerHTML = "";
    }
    var yAxisCategories = document.getElementsByClassName('yAxisCategory');
    for (var q = 0; q < yAxisCategories.length; q++) {
        yAxisCategories[q].innerHTML = "";
    }
    for (var i = 1; i <= 10; i++) {
        var tds = document.getElementById('tr_' + i).children;
        for (var k = 0; k < 20; k++) {
            tds[k + 2].className = "item " + diagramBorder;
        }
        tds[1].innerHTML = "";
    }
}
function showResult(array, expectedValue, deviation) {
    var result = document.getElementsByClassName("result")[0];
    if (document.getElementById("show_entropy").checked) {
        var entropy = countEntropy(numberOfElements, array);
        result.innerHTML = "???????? (???) = " + entropy + "";
    }
    result.innerHTML += "???. ???????? = " + expectedValue + "";
    result.innerHTML += "???????????????????? ?????????? = " + deviation + "";
    var time = new Date().getTime() - startTime;
    result.innerHTML += "????? ??????(??) = " + time + "";
}
function clearResult() {
    document.getElementsByClassName("result")[0].innerHTML = "";
}
function changeBackgroundColor() {
    var oldBackgroundColor = backgroundColor;
    backgroundColor = document.getElementById("background_color").value;
    var elements = document.getElementsByClassName(oldBackgroundColor);
    while (elements.length != 0) {
        elements[0].className = elements[0].className.replace(oldBackgroundColor, backgroundColor);
    }
}
function changeDiagramColor() {
    var value = document.getElementById("diagram_color").value;
    diagramColor = value + 'Diagram';
    var elements = document.getElementsByClassName('fill');
    for (var i = 0; i < elements.length; i++) {
        elements[i].className = "item fill" + diagramColor + "" + diagramBorder;
    }
}
function toggleHistogramGridLines() {
    newDiagramBorder = document.getElementById("show_histogram_grid_lines").checked ? "borderDiagram" : "noBorder";
    var items = document.getElementsByClassName('item');
    for (var i = 0; i < items.length; i++) {
        items[i].className = items[i].className.replace(diagramBorder, newDiagramBorder);
    }
    diagramBorder = newDiagramBorder;
}
function changeTab(tab) {
    switch (tab) {
        case 1:
            document.getElementById('generate').style.display = "block";
            document.getElementById('generateTab').className = backgroundColor;
            document.getElementById('mysql').style.display = "none";
            document.getElementById('mysqlTab').className = "";
            break;
        case 2:
            document.getElementById('generate').style.display = "none";
            document.getElementById('generateTab').className = "";
            document.getElementById('mysql').style.display = "block";
            document.getElementById('mysqlTab').className = backgroundColor;
            break;
    }
}
function isValidUrl(url) {
    return url != "";
}