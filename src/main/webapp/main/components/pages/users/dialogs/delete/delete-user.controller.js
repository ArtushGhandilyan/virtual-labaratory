(function() {
    'use strict';

    angular.module('laboratory')
        .controller('DeleteUserController', DeleteUserController);

    DeleteUserController.$inject = ['$scope', 'userService', '$uibModalInstance'];

    function DeleteUserController($scope, userService, $uibModalInstance) {
        var self = this;

        self.userBean = $scope.userBean;

        self.cancel = cancel;
        self.submit = submit;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            userService.deleteUser(self.userBean.id)
                .then(function(){
                    $uibModalInstance.close();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})();