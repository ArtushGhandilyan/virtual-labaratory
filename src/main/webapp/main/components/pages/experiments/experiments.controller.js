(function () {
    'use strict';

    angular.module('laboratory')
        .controller('ExperimentsController', ExperimentsController);

    ExperimentsController.$inject = ['$scope', 'authService', 'eventService', 'EventTypes'];

    function ExperimentsController($scope, authService, eventService, EventTypes) {
        var self = this;


    }
})();