app.controller('LogoutController', ['AuthenticationService', function(AuthenticationService) {
    var controller = this;
    controller.logout = logout;
    controller.logout();

    function logout() {
        AuthenticationService.Logout();
    }
}]);