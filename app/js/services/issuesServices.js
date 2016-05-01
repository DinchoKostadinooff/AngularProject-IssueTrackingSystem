app.factory('IssuesServices', ['$http', function ($http) {
    var service = {};
    var url = app.baseUrl + '/Issues';

    service.GetAll = GetAll;
    service.GetByProjectId = GetByProjectId;
    service.GetById = GetById;
    service.Create = Create;
    service.Edit = Edit;
    service.GetComments = GetComments;
    service.GetMyIssues = GetMy;
    service.EditStatus = EditStatus;

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

    function GetByProjectId(projectId) {
        var req = {
            method: 'GET',
            url: app.baseUrl + '/Projects/' + projectId + '/Issues',
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

    function GetMy() {
        var req = {
            method: 'GET',
            url: url + '/me?pageSize=100000&pageNumber=1&orderBy=Project.Name',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(req);
    }

    function Create(issues) {
        var req = {
            method: 'POST',
            url: url,
            data: issues,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(req);
    }

    function Edit(id, issue) {
        var request = {
            method: 'PUT',
            url: url + '/' + id,
            data: issue,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(request);
    }

    function GetComments(id) {
        var request = {
            method: 'GET',
            url: url + '/' + id + '/comments',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(request);
    }

    function EditStatus(id, statusId) {
        var request = {
            method: 'PUT',
            url: url + '/' + id + '/changestatus?statusid=' + statusId,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        };

        return $http(request);
    }
}]);