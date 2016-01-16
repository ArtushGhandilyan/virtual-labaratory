(function() {
    'use strict';

    angular
        .module('laboratory')
        .directive('formGeneralError', formGeneralError);

    formGeneralError.$inject = [];

    function formGeneralError() {
        return {
            restrict: 'E',
            templateUrl: '/main/directives/form-general-error/form-general-error.template.html',
            scope: {
                form: '=?'
            }
        };
    }
})();