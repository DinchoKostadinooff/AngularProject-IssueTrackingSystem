app.controller('LoginCtrl', ['$location', 'AuthService', function($location, AuthService) {
    var ctrl = this;
    ctrl.login = login;

    function login() {
        AuthService.Login(ctrl.username, ctrl.password);
    }
}]);