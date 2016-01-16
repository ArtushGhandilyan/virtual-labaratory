(function() {
    'use strict';

    angular
        .module('laboratory')
        .directive('topHeader', topHeader);

    topHeader.$inject = [];

    function topHeader() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/main/components/layout/header/header.template.html'
        };
    }
})();