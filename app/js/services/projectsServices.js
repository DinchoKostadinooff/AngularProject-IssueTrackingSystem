app.factory('ProjectServices', ['$http', function ($http) {
    var service = {};
    var url = app.baseUrl + '/Projects';

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Create = Create;
    service.Edit = Edit;
    service.GetMyProjects = GetMyProjects;

    return service;

    function GetAll() {
        var req = {
            method: 'GET',
            url: url,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(req);
    }

    function GetById(id) {
        var req = {
            method: 'GET',
            url: url + '/' + id,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(req);
    }

    function GetMyProjects() {
        var req = {
            method: 'GET',
            url: url + '?pageSize=10000&pageNumber=1&filter=LeadId="' + sessionStorage.getItem('id') + '"',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(req);
    }

    function Create(project) {
        var req = {
            method: 'POST',
            url: url,
            data: project,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(req);
    }

    function Edit(id, project) {
        var request = {
            method: 'PUT',
            url: url + '/' + id,
            data: project,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(request);
    }
}]);