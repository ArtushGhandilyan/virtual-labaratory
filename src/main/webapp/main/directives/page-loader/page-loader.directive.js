(function() {
    'use strict';

    angular
        .module('laboratory')
        .directive('pageLoader', pageLoader);

    pageLoader.$inject = ['EventTypes'];

    function pageLoader(EventTypes) {
        return {
            restrict: 'E',
            templateUrl: '/main/directives/page-loader/page-loader.template.html',
            link: link
        };

        function link(scope, element, attrs) {
            scope.blockUI = false;

            scope.$on(EventTypes.PAGE_LOADING, blockUI);
            scope.$on(EventTypes.PAGE_LOADED, unBlockUI);
            scope.$on(EventTypes.GENERAL_ERROR, unBlockUI);

            function blockUI() {
                scope.blockUI = true;
            }

            function unBlockUI() {
                scope.blockUI = false;
            }
        }
    }
})();