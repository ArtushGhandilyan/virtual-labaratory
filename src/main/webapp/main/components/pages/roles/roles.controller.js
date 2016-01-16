(function () {
    'use strict';

    angular.module('laboratory')
        .controller('RolesController', RolesController);

    RolesController.$inject = ['$scope', 'authService', 'eventService', 'EventTypes'];

    function RolesController($scope, authService, eventService, EventTypes) {
        var self = this;


    }
})();