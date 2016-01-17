(function () {
    'use strict';

    angular.module('laboratory')
        .config(configAppRoutes);

    configAppRoutes.$inject = ['$routeProvider', 'Page'];

    function configAppRoutes($routeProvider, Page) {

        $routeProvider
            .when('/login', {
                name: Page.LOGIN,
                controller: 'LoginController',
                controllerAs: 'vc',
                templateUrl: '/main/components/pages/login/login.template.html',
                requireAuth: false
            })
            .when('/experiments', {
                name: Page.EXPERIMENTS,
                controller: 'ExperimentsController',
                controllerAs: 'vc',
                templateUrl: '/main/components/pages/experiments/experiments.template.html',
                menu: {
                    title: 'Experiments'
                }
            })
            .when('/experiments/gauss', {
                name: Page.GAUSS,
                controller: 'GaussController',
                controllerAs: 'vc',
                templateUrl: '/main/components/pages/experiments/gauss/gauss.template.html'
            })
            .when('/users', {
                name: Page.USERS,
                controller: 'UsersController',
                controllerAs: 'vc',
                templateUrl: '/main/components/pages/users/users.template.html',
                requirePermissions: ['MANAGE_USERS'],
                menu: {
                    title: 'Users'
                }
            })
            .when('/roles', {
                name: Page.ROLES,
                controller: 'RolesController',
                controllerAs: 'vc',
                templateUrl: '/main/components/pages/roles/roles.template.html',
                requirePermissions: ['MANAGE_ROLES'],
                menu: {
                    title: 'Roles'
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
    }
})();

