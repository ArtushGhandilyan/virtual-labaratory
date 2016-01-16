(function () {
    'use strict';

    angular.module('laboratory')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'authService', 'eventService', 'EventTypes'];

    function LoginController($scope, authService, eventService, EventTypes) {
        var self = this;

        self.loginErrorMessage = null;
        self.credential = {};
        self.performLogin = performLogin;

        registerEventListeners();
        eventService.sendEvent(EventTypes.PAGE_LOADED);

        function registerEventListeners() {
            $scope.$on(EventTypes.LOGIN_ERROR, loginErrorHandler);
            $scope.$watch('vc.credential', clearMessage, true);
        }

        function performLogin() {
            authService.login(self.credential.username, self.credential.password);
        }

        function loginErrorHandler(event, error) {
            self.loginErrorMessage = error.data.responseMessage;
        }

        function clearMessage() {
            self.loginErrorMessage = null;
        }
    }
})();