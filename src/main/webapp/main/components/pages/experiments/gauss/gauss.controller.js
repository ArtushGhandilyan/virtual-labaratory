(function () {
    'use strict';

    angular.module('laboratory')
        .controller('GaussController', GaussController);

    GaussController.$inject = [];

    function GaussController() {
        var self = this;

        self.generate = {};
        self.generate.calculate = calculate;
        self.setting = {};
        self.result = {};

        function calculate() {
            var numberOfSources = self.generate.source;
            var numberOfElements = self.generate.elements;
            self.result.startTime = new Date().getTime();

            generate(numberOfSources, numberOfElements);
        }

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
                for (var k = 0; k < numbers.length; k++) {
                    var round = Math.floor(numbers[k] / gradY - (min / gradY));
                    array[(round == 10) ? 9 : round]++;
                }
                //showHistogram(array, min, gradY);
                showResult(array, numberOfElements, expectedValue, deviation);

            }
        }

        function showHistogram(array, min, gradY) {
            var data = google.visualization.arrayToDataTable([
                ['Dinosaur', 'Length'],
                ['Acrocanthosaurus (top-spined lizard)', 12.2],
                ['Albertosaurus (Alberta lizard)', 9.1],
                ['Allosaurus (other lizard)', 12.2],
                ['Apatosaurus (deceptive lizard)', 22.9],
                ['Archaeopteryx (ancient wing)', 0.9],
                ['Argentinosaurus (Argentina lizard)', 36.6],
                ['Baryonyx (heavy claws)', 9.1],
                ['Brachiosaurus (arm lizard)', 30.5],
                ['Ceratosaurus (horned lizard)', 6.1],
                ['Coelophysis (hollow form)', 2.7],
                ['Compsognathus (elegant jaw)', 0.9],
                ['Deinonychus (terrible claw)', 2.7],
                ['Diplodocus (double beam)', 27.1],
                ['Dromicelomimus (emu mimic)', 3.4],
                ['Gallimimus (fowl mimic)', 5.5],
                ['Mamenchisaurus (Mamenchi lizard)', 21.0],
                ['Megalosaurus (big lizard)', 7.9],
                ['Microvenator (small hunter)', 1.2],
                ['Ornithomimus (bird mimic)', 4.6],
                ['Oviraptor (egg robber)', 1.5],
                ['Plateosaurus (flat lizard)', 7.9],
                ['Sauronithoides (narrow-clawed lizard)', 2.0],
                ['Seismosaurus (tremor lizard)', 45.7],
                ['Spinosaurus (spiny lizard)', 12.2],
                ['Supersaurus (super lizard)', 30.5],
                ['Tyrannosaurus (tyrant lizard)', 15.2],
                ['Ultrasaurus (ultra lizard)', 30.5],
                ['Velociraptor (swift robber)', 1.8]]);

            var options = {
                title: 'Lengths of dinosaurs, in meters',
                legend: { position: 'none' }
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


    }
})();