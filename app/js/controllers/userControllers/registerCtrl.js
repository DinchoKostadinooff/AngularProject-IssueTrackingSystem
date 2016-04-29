app.controller('RegisterCtrl', ['UserServices', 'AuthService', 'NotificationsManager', function (UserServices, AuthenticationService, NotificationsManager) {
    var ctrl = this;
    ctrl.register = register;

    function register() {
        ctrl.dataLoading = true;
        var dataForRegistration = {
            Email: ctrl.user.email,
            Password: ctrl.user.password,
            ConfirmPassword: ctrl.user.confirm_password
        };

        UserServices.Create(dataForRegistration).then(function() {
               // NotificationsManager.showSuccessNotification('Registration successful!');
            AuthenticationService.Login(dataForRegistration.Email, dataForRegistration.Password);
        }, function() {
               // NotificationsManager.showErrorNotification('Registration failed!');
            }
        );
    }
}]);