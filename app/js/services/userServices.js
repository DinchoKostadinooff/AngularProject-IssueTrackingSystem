angular.module('IssueTrackingSystem').factory('UserServices', UserServices);

UserServices.$inject = ['$http'];
function UserServices($http) {
    var service = {};
    var url = app.baseUrl + '/api/Account';

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Create = Create;
    service.ChangePassword = ChangePassword;

    return service;

    function GetAll() {
        var request = {
            method: 'GET',
            url: app.baseUrl + '/Users',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(request);
    }

    function GetById(id) {
        return $http.get(url + '/' + id);
    }

    function Create(user) {
        var req = {
            method: 'POST',
            url: url + '/Register',
            data: user
        };

        return $http(req);
    }

    function ChangePassword(passwords) {
        var request = {
            method: 'POST',
            url: url + '/ChangePassword',
            data: passwords,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(request);
    }
}