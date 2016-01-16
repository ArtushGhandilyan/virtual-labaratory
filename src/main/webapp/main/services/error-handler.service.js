(function () {
    'use strict';

    angular
        .module('laboratory')
        .factory('errorHandler', errorHandler);

    errorHandler.$inject = [];

    function errorHandler() {
        return {
            openGeneralErrorDialog: openGeneralErrorDialog
        };

        function openGeneralErrorDialog(message) {
            //$uibModal.open({
            //    templateUrl: '/main/components/dialogs/general-error/general-error.template.html',
            //    controller: 'GeneralErrorController',
            //    controllerAs: 'dc',
            //    resolve : {
            //        "message" : function() { return message; }
            //    }
            //});
        }
    }
})();