app.controller('UserDashboardController', ['UserServices', 'IssuesServices', 'AuthService', 'ProjectServices', function (UserServices, IssuesServices, AuthenticationService, ProjectServices) {
    var ctrl = this;
    ctrl.issues = [];
    ctrl.projects = [];
    ctrl.myProjects = [];



    ProjectServices.GetMyProjects().then(function(response) {
        ctrl.myProjects = response.data.Projects;
    });
    IssuesServices.GetMyIssues().then(function(response) {
        ctrl.issues = response.data.Issues;
        getProjects();
    });

    function getProjects() {
        var lastId = null;

        for (var i = 0; i < ctrl.issues.length; i++) {
            var project = ctrl.issues[i].Project;

            if (lastId !== project.Id) {
                ctrl.projects.push(project);
                lastId = project.Id;
            }
        }
    }
}]);