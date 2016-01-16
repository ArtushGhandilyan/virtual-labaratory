(function() {
    'use strict';

    angular.module('laboratory')
        .factory('authService', authService);

    authService.$inject = ['$http', '$httpParamSerializer', '$sessionStorage', 'eventService', 'EventTypes', 'Path'];

    function authService($http, $httpParamSerializer, $storage, eventService, EventTypes, Path) {
        return {
            login: login,
            logout: logout,

            isAuthenticated: isAuthenticated,
            hasPermission: hasPermission,

            getUserInfo: getUserInfo,
            clearUserInfo: clearUserInfo,
            updateUserInfo: updateUserInfo
        };

        function login(username, password) {
            $http({
                method: 'POST',
                url: Path.API_ENDPOINT_BASE_URL + '/login',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $httpParamSerializer({username: username, password: password})
            })
                .then(function (response) {
                    var userInfo = response.data['responseParamsMap'];
                    storeUserInfo(userInfo);
                    eventService.sendEvent(EventTypes.LOGIN_SUCCESS, userInfo);
                })
                .catch(function (error) {
                    eventService.sendEvent(EventTypes.LOGIN_ERROR, error);
                });
        }

        function logout() {
            $http.get(Path.API_ENDPOINT_BASE_URL + '/logout')
                .then(function (response) {
                    eventService.sendEvent(EventTypes.LOGOUT_SUCCESS, response.data);
                })
                .catch(function (error) {
                    eventService.sendEvent(EventTypes.LOGOUT_ERROR, error);
                })
                .finally(function() {
                    clearUserInfo();
                });
        }

        function storeUserInfo(userInfo) {
            $storage.userInfo = userInfo;
        }

        function getUserInfo() {
            return $storage.userInfo || null;
        }

        function updateUserInfo() {
            return $http.get(Path.API_ENDPOINT_BASE_URL + '/user-info').then(
                function (response) {
                    var userInfo = response.data['responseParamsMap'];
                    storeUserInfo(userInfo);
                },
                function(error) {
                    clearUserInfo();
                });
        }

        function clearUserInfo() {
            delete $storage.userInfo;
        }

        function isAuthenticated() {
            return getUserInfo() != null;
        }

        function hasPermission(requiredPermissions) {
            var userInfo = getUserInfo();
            var userPermissions = userInfo.permissions;
            if(requiredPermissions) {
                for(var i = 0 ; i < requiredPermissions.length; i++) {
                    var hasPermission = false;
                    for(var j = 0; j < userPermissions.length; j++) {
                        if(userPermissions[j]['authority'] == requiredPermissions[i]) {
                            hasPermission = true;
                            break;
                        }
                    }
                    if(!hasPermission) {
                        return false;
                    }
                }
            }
            return true;
        }
    }
})();