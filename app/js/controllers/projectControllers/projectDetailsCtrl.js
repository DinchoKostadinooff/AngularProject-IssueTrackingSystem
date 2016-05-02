app.controller('ProjectDetailsController', ['ProjectServices', 'IssuesServices', 'UserServices', '$location', '$routeParams', function (ProjectServices, IssuesServices, UserServices, $location, $routeParams) {
    var ctrl = this;
    var id = $routeParams.id;
    ctrl.project = {};
    ctrl.issues = [];

    ProjectServices.GetById(id).then(function(response) {
        ctrl.project = response.data;
    });

    IssuesServices.GetByProjectId(id).then(function(response) {
        ctrl.issues = response.data;
    });
}]);