app.controller('RegisterController', ['UserServices', 'AuthenticationService', 'NotificationsManager', function (UserServices, AuthenticationService, NotificationsManager) {
    var controller = this;
    controller.register = register;

    function register() {
        controller.dataLoading = true;
        var userForRegister = {
            Email: controller.user.email,
            Password: controller.user.password,
            ConfirmPassword: controller.user.confirm_password
        };

        UserServices.Create(userForRegister).then(function() {
               // NotificationsManager.showSuccessNotification('Registration successful!');
            AuthenticationService.Login(userForRegister.Email, userForRegister.Password);
        }, function() {
               // NotificationsManager.showErrorNotification('Registration failed!');
            }
        );
    }
}]);