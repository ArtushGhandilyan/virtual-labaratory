(function () {
    'use strict';

    angular
        .module('laboratory')
        .factory('roleService', roleService);

    roleService.$inject = ['$http', 'Path'];

    function roleService($http, Path) {
        var RESOURCE_BASE_URL = '/roles';

        return {
            getRoles: getRoles,
            createRole: createRole,
            updateRole: updateRole,
            deleteRole: deleteRole
        };

        function getRoles() {
            return $http.get(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL);
        }

        function createRole(data){
            return $http.post(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL, data);
        }

        function updateRole(data){
            return $http.put(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL, data);
        }

        function deleteRole(id){
            return $http.delete(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL + '/' + id);
        }
    }
})();