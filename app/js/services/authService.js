app.factory('AuthenticationService', ['NotificationsManager', '$http', '$cookieStore', '$rootScope', '$location', function(NotificationsManager, $http, $cookieStore, $rootScope, $location) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(username, password) {
        var loginData = 'username=' + username + '&Password=' + password + '&grant_type=password';
        var request = {
            method: 'POST',
            url: app.baseUrl + '/api/Token',
            data: loginData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        return $http(request)
            .then(function (response) {
                setCredentials(response);
                NotificationsManager.success('Success login!')
                $location.path('/');
            },
            function () {
                //NotificationsManager.showErrorNotification('An error occurred while logging in!')
            }
        );
    }

    function Logout(){
        clearCredentials();
       // NotificationsManager.showSuccessNotification('Logout successful!');
        $location.path('/');
    }

    function getUserInfo() {
        var request = {
            method: 'GET',
            url: app.baseUrl + '/Users/me',
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        };

        $http(request)
            .then(function (response) {
                sessionStorage.setItem('id', response.data.Id);
                sessionStorage.setItem('isAdmin', response.data.isAdmin);
            }
        );
    }

    function setCredentials(response) {
        var token = response.data.access_token;
        sessionStorage.setItem('token', token);
        $rootScope.loggedIn = true;
        getUserInfo();
    }

    function clearCredentials() {
        sessionStorage.clear();
        $rootScope.loggedIn = false;
    }
}]);
