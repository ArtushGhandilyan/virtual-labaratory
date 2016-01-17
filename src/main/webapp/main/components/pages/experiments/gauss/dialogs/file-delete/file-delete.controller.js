(function() {
    'use strict';

    angular.module('laboratory')
        .controller('GaussFileDeleteController', GaussFileDeleteController);

    GaussFileDeleteController.$inject = ['$scope', 'gaussService', '$uibModalInstance'];

    function GaussFileDeleteController($scope, gaussService, $uibModalInstance) {
        var self = this;

        self.file = $scope.file;

        self.cancel = cancel;
        self.submit = submit;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            gaussService.deleteFile(self.file.id)
                .then(function(){
                    $uibModalInstance.close();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})();