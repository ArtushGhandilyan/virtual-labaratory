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
            EXPERIMENTS: 'experiments',
            USERS: 'users',
            ROLES: 'roles',

            GAUSS: 'gauss'
        })
        .constant('NotificationScheduleTypes', {
            NO_SCHEDULE: 0,
            SPECIFIC_TIME: 1,
            SKILL_COMPLETION_PROGRESS: 2,
            LEARNER_INACTIVITY: 3,
            LEARNER_PROGRESS: 4
        })
        .constant('SkillCompletionProgressIntervals', {
            NEVER_LOGGED_IN: 0,
            LESS_THAN_10_PERCENT: 1,
            BETWEEN_10_AND_50_PERCENT: 2,
            BETWEEN_50_AND_95_PERCENT: 3,
            BETWEEN_95_AND_99_PERCENT: 4,
            EXACTLY_100_PERCENT: 5
        })
        .constant('LoadStates', {
            LOADING: 'loading',
            LOADED: 'loaded',
            ERROR: 'error'
        })
        .constant('EventTypes', {
            LOGIN_SUCCESS: 'loginSuccess',
            LOGOUT_SUCCESS: 'logoutSuccess',
            LOGIN_ERROR: 'loginError',
            LOGOUT_ERROR: 'logoutError',

            USER_REGISTERED: 'userRegistered',

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
            ADMIN: 3
        });
})();