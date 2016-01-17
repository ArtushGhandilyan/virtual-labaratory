(function() {
    'use strict';

    angular.module('laboratory')
        .controller('GaussFileUploadController', GaussFileUploadController);

    GaussFileUploadController.$inject = ['$scope', '$uibModalInstance', 'gaussService'];

    function GaussFileUploadController($scope, $uibModalInstance, gaussService) {
        var self = this;

        self.data = {
            access: 1
        };

        self.cancel = cancel;
        self.submit = submit;

        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }

        function submit(){
            gaussService.uploadFile(self.data)
                .then(function(response) {
                    var fileName = response.data.responseParamsMap['fileName'];
                    var fileId = response.data.responseParamsMap['fileId'];

                    $uibModalInstance.close({
                        id: fileId,
                        name: fileName
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})();