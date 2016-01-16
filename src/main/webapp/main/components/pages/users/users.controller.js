(function () {
    'use strict';

    angular.module('laboratory')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$scope', '$q', '$uibModal',
        'userService', 'roleService', 'utilService', 'eventService', 'EventTypes'];

    function UsersController($scope, $q, $uibModal, userService, roleService, utilService, eventService, EventTypes) {
        var self = this;

        self.usersList = null;
        self.rolesList = null;
        self.rolesMap = null;

        self.openCreateUserDialog = openCreateUserDialog;
        self.openEditUserDialog = openEditUserDialog;
        self.openDeleteUserDialog = openDeleteUserDialog;

        init();

        function init() {
            var getUsers = userService.getUsers();
            var getRoles = roleService.getRoles();

            $q.all([getUsers, getRoles])
                .then(function (results) {
                    self.usersList = results[0].data;
                    self.rolesList = results[1].data;
                    self.rolesMap = utilService.listToMap(results[1].data, 'id');
                })
                .catch(function () {

                })
                .finally(function () {
                    eventService.sendEvent(EventTypes.PAGE_LOADED);
                });
        }

        function openCreateUserDialog() {
            var dc = $scope.$new();
            dc.action = 'create';
            dc.userBean = {};
            dc.rolesList = self.rolesList;

            var dialog = $uibModal.open({
                templateUrl: '/main/components/pages/users/dialogs/create-update/user-dialog.template.html',
                controller: 'UserDialogController',
                controllerAs: 'dc',
                scope: dc
            });

            dialog.result
                .then(function(user) {
                    self.usersList.push(user);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function openEditUserDialog(event, index) {
            event.preventDefault();

            var selectedUser = angular.copy(self.usersList[index]);
            var selectedUserIndex = index;

            var dc = $scope.$new();
            dc.action = 'update';
            dc.userBean = selectedUser;
            dc.rolesList = self.rolesList;

            var dialog = $uibModal.open({
                templateUrl: '/main/components/pages/users/dialogs/create-update/user-dialog.template.html',
                controller: 'UserDialogController',
                controllerAs: 'dc',
                scope: dc
            });

            dialog.result
                .then(function(user) {
                    self.usersList[selectedUserIndex] = user;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function openDeleteUserDialog(event, index) {
            event.preventDefault();

            var selectedUser = angular.copy(self.usersList[index]);
            var selectedUserIndex = index;

            var dc = $scope.$new();
            dc.userBean = selectedUser;

            var dialog = $uibModal.open({
                templateUrl: '/main/components/pages/users/dialogs/delete/delete-user.template.html',
                controller: 'DeleteUserController',
                controllerAs: 'dc',
                scope: dc
            });

            dialog.result
                .then(function() {
                    self.usersList.splice(selectedUserIndex, 1);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

    }
})();