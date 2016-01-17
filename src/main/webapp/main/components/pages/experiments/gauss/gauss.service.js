(function () {
    'use strict';

    angular
        .module('laboratory')
        .factory('gaussService', gaussService);

    gaussService.$inject = ['$http', 'Path'];

    function gaussService($http, Path) {
        var RESOURCE_BASE_URL = '/gauss/files';

        return {
            getFiles: getFiles,
            loadFile: loadFile,
            uploadFile: uploadFile,
            deleteFile: deleteFile
        };

        function getFiles() {
            return $http.get(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL);
        }

        function loadFile(id) {
            return $http.get(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL + '/' + id);
        }

        function uploadFile(data){
            var formData = new FormData();

            formData.append('file', data.csvFile);
            formData.append('access', data.access);
            formData.append('name', data.name);

            return $http({
                method: 'POST',
                url: Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL,
                transformRequest: angular.identity,
                headers: {
                    // By setting ?Content-Type?: undefined, the browser sets
                    // the Content-Type to multipart/form-data for us
                    // and fills in the correct boundary.
                    'Content-Type': undefined
                },
                data: formData
            });
        }

        function deleteFile(id){
            return $http.delete(Path.API_ENDPOINT_BASE_URL + RESOURCE_BASE_URL + '/' + id);
        }
    }
})();