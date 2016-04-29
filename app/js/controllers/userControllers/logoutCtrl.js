app.controller('LogoutCtrl', ['AuthService', function(AuthenticationService) {
    var ctrl = this;
    ctrl.logout = logout;
    ctrl.logout();

    function logout() {
        AuthenticationService.Logout();
    }
}]);