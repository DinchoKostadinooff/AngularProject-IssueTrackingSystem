app.controller('UserDashboardController', ['UserServices', 'IssuesServices', 'AuthenticationService', 'ProjectServices', function (UserServices, IssuesServices, AuthenticationService, ProjectServices) {
    var controller = this;
    controller.issues = [];
    controller.projects = [];
    controller.myProjects = [];

    IssuesServices.GetMine().then(function(response) {
        controller.issues = response.data.Issues;
        getProjects();
    });

    ProjectServices.GetMyProjects().then(function(response) {
        controller.myProjects = response.data.Projects;
    });

    function getProjects() {
        var lastId = null;

        for (var i = 0; i < controller.issues.length; i++) {
            var project = controller.issues[i].Project;

            if (lastId !== project.Id) {
                controller.projects.push(project);
                lastId = project.Id;
            }
        }
    }
}]);