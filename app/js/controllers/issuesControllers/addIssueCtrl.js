app.controller('AddIssueController', ['IssuesServices', 'ProjectServices', 'UserServices', '$location', '$routeParams', function (IssuesServices, ProjectServices, UserServices, $location, $routeParams) {
    var controller = this;
    controller.add = add;
    controller.users = [];
    controller.project = {};

    UserServices.GetAll().then(function(response) {
        controller.users = response.data;
    });

    var projectId = $routeParams.id;
    ProjectServices.GetById(projectId).then(function(response) {
        controller.project = response.data;

        if (sessionStorage.getItem('checkIsAdmin') !== 'true' && controller.project.Lead.Id !== sessionStorage.getItem('id')) {
            $location.path('/projects/' + controller.project.Id);
        }
    });

    function add() {
        controller.dataLoading = true;

        var issueForAdding = {
            Title: controller.issue.title,
            DueDate: controller.issue.duedate,
            Description: controller.issue.description,
            ProjectId: projectId,
            AssigneeId: controller.issue.assignee,
            PriorityId: controller.issue.priority
        };

        var labelsSplit = controller.issue.labelsString.split(' ');
        issueForAdding.labels = [];

        for (var i = 0; i < labelsSplit.length; i++) {
            issueForAdding.labels.push({ Name: labelsSplit[i] });
        }

        IssuesServices.Create(issueForAdding)
            .then(function (response) {
                if (response.success) {
                    $location.path('/');
                } else {
                    controller.dataLoading = false;
                }

                $location.path('/projects/' + controller.project.Id)
            });
    }
}]);