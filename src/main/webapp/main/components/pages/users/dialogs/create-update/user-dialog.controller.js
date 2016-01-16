(function() {
    'use strict';

    angular.module('laboratory')
        .controller('UserDialogController', UserDialogController);

    UserDialogController.$inject = ['$scope', '$uibModalInstance', 'userService'];

    function UserDialogController($scope, $uibModalInstance, userService) {
        var self = this;

        self.action = $scope.action;
        self.title = ($scope.action == 'create') ? 'NEW USER' : 'EDIT USER';
        self.rolesList = $scope.rolesList;
        self.userBean = $scope.userBean;

        self.cancel = cancel;
        self.submit = submit;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            self.userBean.userDomains = parseUserDomains(self.userDomains);
            self.action == 'create' ? createUser() : updateUser();
        }

        function createUser() {
            userService.createUser(self.userBean)
                .then(function(response) {
                    self.userBean.id = response.data.responseParamsMap['userId'];
                    $uibModalInstance.close(self.userBean);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function updateUser() {
            userService.updateUser(self.userBean)
                .then(function(response) {
                    $uibModalInstance.close(self.userBean);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function parseUserDomains() {
            return self.userDomains.map(function(domain) {
                return domain.id;
            });
        }

        function initDomains(domainsMap) {
            var domains = [];
            angular.forEach(domainsMap, function(name, id) {
                domains.push({
                    id: parseInt(id),
                    name: name
                });
            });
            return domains;
        }

        function initUserDomains(domainIds, domainsMap) {
            var userDomains = [];
            for(var i = 0; i < domainIds.length; i++) {
                userDomains.push({
                    id: domainIds[i],
                    name: domainsMap[domainIds[i]]
                });
            }
            return userDomains;
        }
    }
})();