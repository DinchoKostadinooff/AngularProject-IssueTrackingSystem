app.controller('LoginController', ['$location', 'AuthenticationService', function($location, AuthenticationService) {
    var ctrl = this;
    ctrl.login = login;

    function login() {
        AuthenticationService.Login(ctrl.username, ctrl.password);
    }
}]);