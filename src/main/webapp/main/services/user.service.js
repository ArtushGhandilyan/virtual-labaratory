(function () {
    'use strict';

    angular
        .module('laboratory')
        .factory('userService', userService);

    userService.$inject = ['$http', 'Path'];

    function userService($http, Path) {
        var RESOURCE_BASE_URL = '/users';

        return {
            getUsers: getUsers,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function getUsers() {
            return $http.get(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL);
        }

        function createUser(data){
            return $http.post(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL, data);
        }

        function updateUser(data){
            return $http.put(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL, data);
        }

        function deleteUser(id){
            return $http.delete(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL + '/' + id);
        }
    }
})();