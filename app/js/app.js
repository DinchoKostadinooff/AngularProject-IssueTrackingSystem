var app = angular.module('IssueTrackingSystem', ['ngRoute', 'ngCookies']);

app.baseUrl = 'http://softuni-issue-tracker.azurewebsites.net';
app.config(function ($routeProvider) {
    $routeProvider
       
        .when('/login', {
            controller: 'LoginCtrl',
            templateUrl: 'views/userViews/loginView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: false,
                admin: false
            }

        })
        .when('/register', {
            controller: 'RegisterCtrl',
            templateUrl: 'views/userViews/registerView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: false,
                admin: false
            }
        })
        .when('/profile', {
            controller: 'UserDashboardController',
            templateUrl: 'views/userViews/DashboardView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: false
            }
        })
        .when('/profile/password', {
            controller: 'ChangePasswordCtrl',
            templateUrl: 'views/userViews/changePassView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: false
            }
        })
        .when('/projects/add', {
            controller: 'AddProjectController',
            templateUrl: 'views/projectViews/addProjectView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: true
            }
        })
        .when('/projects', {
            controller: 'AllProjectsCtrl',
            templateUrl: 'views/projectViews/allProjectsView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: true
            }
        })
        .when('/projects/:id', {
            controller: 'ProjectDetailsController',
            templateUrl: 'views/projectViews/DetailsView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: false
            }
        })
        .when('/projects/:id/edit', {
            controller: 'EditProjectController',
            templateUrl: 'views/projectViews/editProjectView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: false
            }
        })
        .when('/projects/:id/add-issue', {
            controller: 'AddIssueController',
            templateUrl: 'views/issueViews/addView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: false
            }
        })
        .when('/issues/:id', {
            controller: 'IssueDetailsController',
            templateUrl: 'views/issueViews/DetailsView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: false
            }
        })
        .when('/issues/:id/edit', {
            controller: 'EditIssueController',
            templateUrl: 'views/issueViews/editIssueView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: false
            }
        })
        .when('/logout', {
            resolve: {
                logout: ['AuthService', function (AuthenticationService) {
                    AuthenticationService.Logout();
                }]
            },
            access: {
                loggedIn: true,
                admin: false
            },
            redirectTo: '/'
        })
        .otherwise({
            redirectTo: '/'
        });
});


app.run(['$rootScope', '$location', 'AuthCheck', function($rootScope, $location, AuthCheck) {
    $rootScope.$on('$routeChangeStart', function(ev, next, current) {
        var loggedIn = AuthCheck.checkIsLoggedIn();
        var isAdmin = AuthCheck.checkIsAdmin() === 'true';
        $rootScope.loggedIn = loggedIn;
        $rootScope.isAdmin = isAdmin;
        $rootScope.userId = sessionStorage.getItem('id');

        var access = next.$$route.access;

        if (!access) {
            return;
        }

        if (access.loggedIn) {
            if (access.admin) {
                if (!isAdmin) {
                    $location.url('/');
                }
            }
            else {
                if (!loggedIn) {
                    $location.url('/');
                }
            }
        } else {
            if (loggedIn) {
                $location.url('/');
            }
        }
    })
}]);