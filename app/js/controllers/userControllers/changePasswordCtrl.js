app.controller('ChangePasswordController', ['UserServices', 'NotificationsManager', '$location', function (UserServices, NotificationsManager, $location) {
    var controller = this;
    controller.changePassword = changePassword;

    function changePassword() {
        controller.dataLoading = true;

        var passwords = {
            OldPassword: controller.user.old_password,
            NewPassword: controller.user.new_password,
            ConfirmPassword: controller.user.confirm_password
        };

        UserServices.ChangePassword(passwords)
            .then(function () {
              //  NotificationsManager.showSuccessNotification('Password successfully changed!');
                $location.path('/');
            }, function() {
              //  NotificationsManager.showErrorNotification('An error occurred while changing password!');
            });
    }
}]);