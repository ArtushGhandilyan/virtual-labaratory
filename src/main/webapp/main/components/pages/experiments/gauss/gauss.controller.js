(function () {
    'use strict';

    angular.module('laboratory')
        .controller('GaussController', GaussController);

    GaussController.$inject = ['$scope', '$q', '$uibModal', 'gaussService', 'eventService', 'EventTypes'];

    function GaussController($scope, $q, $uibModal, gaussService, eventService, EventTypes) {
        var self = this;

        self.accessNames = {
            0: 'Private',
            1: 'Protected',
            2: 'Public'
        };
        self.filesList = [];

        self.template = {};
        self.template.calculate = loadAndCalculate;

        self.generate = {
            source: 10,
            elements: 1000,
            calculate : calculate
        };

        self.setting = {
            backgroundColor: 'white',
            diagramColor: 'black'
        };

        self.result = {};
        self.openFileUploadDialog = openFileUploadDialog;
        self.openFileDeleteDialog = openFileDeleteDialog;

        init();

        function init() {
            eventService.sendEvent(EventTypes.PAGE_LOADING);

            var getFiles = gaussService.getFiles();
            $q.all([getFiles])
                .then(function (results) {
                    self.filesList = results[0].data;
                })
                .catch(function (e) {

                })
                .finally(function () {
                    eventService.sendEvent(EventTypes.PAGE_LOADED);
                });


            try {
                google.charts.load("current", {packages:["corechart"]});
            } catch(e) {

            }
        }

        function calculate() {
            var numberOfSources = self.generate.source;
            var numberOfElements = self.generate.elements;
            self.result.startTime = new Date().getTime();

            generate(numberOfSources, numberOfElements);
        }

        function generate(numberOfSources, numberOfElements) {
            var uniformDistributionNumbersArray = generateUniformDistributionNumbers(numberOfSources, numberOfElements);
            calculateNormalDistributedNumbers(uniformDistributionNumbersArray);
        }

        function calculateNormalDistributedNumbers(uniformDistributionNumbersArray) {
            var numberOfSources = uniformDistributionNumbersArray.length;
            var numberOfElements = uniformDistributionNumbersArray[0].length;

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

        function showData(numbers, params) {
            if (numbers.length != 0) {
                var numberOfElements = numbers.length;
                var min = parseFloat(params.min) || 0;
                var expectedValue = parseFloat(params.expectedValue) || 0;
                var deviation = parseFloat(params.deviation) || 0;
                var gradY = parseFloat(params.gradY) || 0;

                var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var result = [['Number']];
                for (var k = 0; k < numbers.length; k++) {
                    var round = Math.floor(numbers[k] / gradY - (min / gradY));
                    array[(round == 10) ? 9 : round]++;
                    result.push([numbers[k]]);
                }
                showHistogram(result);
                showResult(array, numberOfElements, expectedValue, deviation);
            }
        }

        function showHistogram(array) {
            var data = google.visualization.arrayToDataTable(array);

            var options = {
                legend: { position: 'none' },
                colors: [self.setting.diagramColor],
                backgroundColor: self.setting.backgroundColor,
                vAxis: {
                    gridlines: {
                        count: self.setting.showGrid ? 10 : 0
                    }
                }
            };

            var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
            chart.draw(data, options);
        }

        function showResult(array, numberOfElements, expectedValue, deviation) {
            if (self.setting.calculateEntropy) {
                self.result.entropy = countEntropy(numberOfElements, array);
            }
            self.result.expectedValue = expectedValue;
            self.result.deviation =  deviation;
            self.result.duration = new Date().getTime() - self.result.startTime;
        }

        function countEntropy(count, array) {
            var entropy = 0;
            for (var i = 0; i < array.length; i++) {
                var p = array[i] / count;
                entropy += (p != 0) ? (-1) * p * Math.log(p) : 0;
            }
            return entropy.toFixed(2);
        }

        function openFileUploadDialog() {
            var dialog = $uibModal.open({
                templateUrl: '/main/components/pages/experiments/gauss/dialogs/file-upload/file-upload.template.html',
                controller: 'GaussFileUploadController',
                controllerAs: 'dc'
            });

            dialog.result
                .then(function(file) {
                    self.filesList.push(file);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function openFileDeleteDialog(event, index) {
            event.preventDefault();

            var selectedFile = angular.copy(self.filesList[index]);
            var selectedFileIndex = index;

            var dc = $scope.$new();
            dc.file = selectedFile;

            var dialog = $uibModal.open({
                templateUrl: '/main/components/pages/experiments/gauss/dialogs/file-delete/file-delete.template.html',
                controller: 'GaussFileDeleteController',
                controllerAs: 'dc',
                scope: dc
            });

            dialog.result
                .then(function() {
                    self.filesList.splice(selectedFileIndex, 1);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function loadAndCalculate() {
            self.result.startTime = new Date().getTime();

            var fileId = self.template.fileId;
            gaussService.loadFile(fileId)
                .then(function(response) {
                    var uniformDistributionNumbersArray = response.data;
                    calculateNormalDistributedNumbers(uniformDistributionNumbersArray);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})();