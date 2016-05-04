app.controller('IssueDetailsController', ['ProjectServices', 'IssuesServices', '$location', '$routeParams', function (ProjectServices, IssuesServices, $location, $routeParams) {
    var ctrl = this;
    var id = $routeParams.id;
    ctrl.issue = {};
    ctrl.project = {};
    ctrl.comments = [];

    IssuesServices.GetComments(id).then(function(response) {
        ctrl.comments = response.data;
    });

    IssuesServices.GetById(id).then(function(response) {
        ctrl.issue = response.data;

        ProjectServices.GetById(ctrl.issue.Project.Id).then(function (projectResponse) {
            ctrl.project = projectResponse.data;
        });
    });
}]);