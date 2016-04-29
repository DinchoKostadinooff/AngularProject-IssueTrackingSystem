app.controller('ChangePasswordCtrl', ['UserServices', 'NotificationsManager', '$location', function (UserServices, NotificationsManager, $location) {
    var ctrl = this;
    ctrl.changePassword = changePassword;

    function changePassword() {
        ctrl.dataLoading = true;

        var passwords = {
            OldPassword: ctrl.user.old_password,
            NewPassword: ctrl.user.new_password,
            ConfirmPassword: ctrl.user.confirm_password
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