(function () {
    'use strict';

    angular.module('laboratory')
        .config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('customHttpInterceptor');
        }])
        .constant('Path', {
            API_ENDPOINT_BASE_URL: '/rest',
            APP_CONTEXT_PATH: ''
        })
        .constant('Page', {
            LOGIN: 'login',
            USERS: 'users',
            ROLES: 'roles',
            EXPERIMENTS: 'experiments',
            GAUSS: 'gauss'
        })
        .constant('EventTypes', {
            LOGIN_SUCCESS: 'loginSuccess',
            LOGOUT_SUCCESS: 'logoutSuccess',
            LOGIN_ERROR: 'loginError',
            LOGOUT_ERROR: 'logoutError',

            ACCESS_DENIED: 'accessDenied',
            SESSION_EXPIRED: 'sessionExpired',
            NOT_AUTHENTICATED: 'notAuthenticated',

            PAGE_LOADING: 'pageLoading',
            PAGE_LOADED: 'pageLoaded',

            GENERAL_ERROR: 'generalError'
        })
        .constant('ResponseCodes', {
            SUCCESS: 0,
            GENERAL_ERROR: 1,
            ACCESS_DENIED: 2,
            TOO_MANY_MATCHES: 41,
            REQUEST_IS_OUT_OF_DATE: 42,
            REQUEST_VALIDATION_ERROR: 50,
            REQUEST_VALIDATION_ERROR_SEVERE : 51
        })
        .constant('Role', {
            STUDENT: 1,
            TEACHER: 2,
            ADMIN: 3,
            GUEST: 3
        });
})();