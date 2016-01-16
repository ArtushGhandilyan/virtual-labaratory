(function() {
    'use strict';

    angular.module('laboratory')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$route', '$anchorScroll', 'errorHandler', 'authService', 'navigationService', 'eventService', 'Page', 'EventTypes'];

    function AppController($scope, $route, $anchorScroll, errorHandler, authService, navigationService, eventService, Page, EventTypes) {
        var self = this;

        self.navigationService = navigationService;
        self.Page = Page;
        self.userInfo = authService.getUserInfo();

        init();
        registerEventListeners();

        function init() {
            authService.updateUserInfo()
                .then(function() {
                    self.userInfo = authService.getUserInfo();
                })
                .finally(function() {
                    $route.reload();
                    self.ready = true;
                });
        }

        function registerEventListeners() {
            $scope.$on(EventTypes.LOGIN_SUCCESS, loginSuccessHandler);
            $scope.$on(EventTypes.LOGOUT_SUCCESS, logoutSuccessHandler);

            $scope.$on(EventTypes.ACCESS_DENIED, accessDeniedHandler);
            $scope.$on(EventTypes.SESSION_EXPIRED, sessionExpiredHandler);
            $scope.$on(EventTypes.NOT_AUTHENTICATED, notAuthenticatedHandler);

            $scope.$on(EventTypes.GENERAL_ERROR, generalErrorHandler);
            $scope.$on('$routeChangeStart', routeChangeStartHandler);
            $scope.$on('$routeChangeError', routeChangeErrorHandler);
        }

        function loginSuccessHandler(event, userInfo) {
            self.userInfo = userInfo;
            if(navigationService.hasTargetPage()) {
                navigationService.navigateToTargetPage();
            } else {
                navigationService.navigateTo(Page.EXPERIMENTS);
            }
        }

        function logoutSuccessHandler(event) {
            self.userInfo = null;
            navigationService.navigateTo(Page.LOGIN);
        }

        function accessDeniedHandler(event) {
            console.info('access denied');
        }

        function sessionExpiredHandler(event) {
            console.info('session expired');
            self.userInfo = null;
            authService.clearUserInfo();
            navigationService.navigateTo(Page.LOGIN);
        }

        function notAuthenticatedHandler(event) {
            console.info('not authenticated');
            self.userInfo = null;
            authService.clearUserInfo();
            navigationService.navigateTo(Page.LOGIN);
        }

        function generalErrorHandler(event, message) {
            errorHandler.openGeneralErrorDialog(message);

        }

        function routeChangeStartHandler(event, next, current) {
            //eventService.sendEvent(EventTypes.PAGE_LOADED);
            //eventService.sendEvent(EventTypes.PAGE_LOADING);

            // Navigation access control functionality.
            if(isRequireAuth() && !isAuthenticated()) {
                navigationService.setTargetPage();
                navigationService.navigateTo(Page.LOGIN);
            }
            else if(isAuthenticated() && isGoTo(Page.LOGIN)) {
                navigationService.navigateTo(Page.EXPERIMENTS);
            }
            else if(isAuthenticated() && !hasPermissions()) {
                navigationService.navigateTo(Page.EXPERIMENTS);
            }

            function isGoTo(page) {
                return next.originalPath && next.originalPath.substring(1) == page;
            }

            function isRequireAuth() {
                return next.requireAuth != false;
            }

            function hasPermissions() {
                return authService.hasPermission(next.requirePermissions);
            }

            function isAuthenticated() {
                return authService.isAuthenticated();
            }
        }

        function routeChangeErrorHandler(event, next, current) {
            eventService.sendEvent(EventTypes.PAGE_LOADED);
        }
    }
})();