var app = angular.module('IssueTrackingSystem', ['ngRoute', 'ngCookies']);

app.baseUrl = 'http://softuni-issue-tracker.azurewebsites.net';
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "views/sharedViews/home.html"
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/userViews/loginView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: false,
                admin: false
            }
        })
        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'views/userViews/registerView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: false,
                admin: false
            }
        })
        .when('/profile', {
            controller: 'UserDashboardController',
            templateUrl: 'views/userViews/userDashboardView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: false
            }
        })
        .when('/profile/password', {
            controller: 'ChangePasswordController',
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
            controller: 'AllProjectsController',
            templateUrl: 'views/projectViews/allProjectsView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: true
            }
        })
        .when('/projects/:id', {
            controller: 'ProjectDetailsController',
            templateUrl: 'views/projectViews/projectDetailsView.html',
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
            templateUrl: 'views/issueViews/addIssueView.html',
            controllerAs: 'controller',
            access: {
                loggedIn: true,
                admin: false
            }
        })
        .when('/issues/:id', {
            controller: 'IssueDetailsController',
            templateUrl: 'views/issueViews/issueDetailsView.html',
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
                logout: ['AuthenticationService', function (AuthenticationService) {
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
        var loggedIn = AuthCheck.isLoggedIn();
        var isAdmin = AuthCheck.isAdmin() === 'true';
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