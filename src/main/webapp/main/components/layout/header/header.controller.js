(function () {
    'use strict';

    angular.module('laboratory')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$route', '$location', 'navigationService', 'authService'];

    function HeaderController($route, $location, navigationService, authService) {
        var self = this;

        self.performLogout = performLogout;
        self.menuItems = initMenuItems();

        self.showNavigationMenu = showNavigationMenu;
        self.hasAccess = hasAccess;
        self.menuClass = menuClass;

        function initMenuItems() {
            var menu = [];
            var routes = $route.routes;

            angular.forEach(routes, function(route, url) {
                var options = route.menu;
                if(options) {
                    var item = {
                        title: options.title || route.name,
                        icon: options.icon,
                        name: route.name,
                        path: navigationService.getPageFullPath(route.name),
                        requirePermissions: route.requirePermissions
                    };
                    menu.push(item);
                }
            });

            return menu;
        }

        function showNavigationMenu() {
            return authService.isAuthenticated();
        }

        function hasAccess(item) {
            if(item.requirePermissions) {
                return authService.hasPermission(item.requirePermissions);
            }
            return true;
        }

        function menuClass(page) {
            var current = $location.path().substring(1);
            return page === current ? "active" : "";
        }

        function performLogout() {
            authService.logout();
        }
    }
})();