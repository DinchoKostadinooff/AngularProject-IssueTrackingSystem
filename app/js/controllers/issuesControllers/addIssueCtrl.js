app.controller('AddIssueController', ['IssuesServices', 'ProjectServices', 'UserServices', '$location', '$routeParams', function (IssuesServices, ProjectServices, UserServices, $location, $routeParams) {
    var ctrl = this;
    ctrl.add = addIssue;
    ctrl.users = [];
    ctrl.project = {};

    UserServices.GetAll().then(function(response) {
        ctrl.users = response.data;
    });


    function addIssue() {
        ctrl.dataLoading = true;

        var issue = {
            Title: ctrl.issue.title,
            DueDate: ctrl.issue.duedate,
            Description: ctrl.issue.description,
            ProjectId: projectId,
            AssigneeId: ctrl.issue.assignee,
            PriorityId: ctrl.issue.priority
        };

        var splitLabels = ctrl.issue.labelsString.split(' ');
        issue.labels = [];

        for (var i = 0; i < splitLabels.length; i++) {
            issue.labels.push({ Name: splitLabels[i] });
        }

        var projectId = $routeParams.id;
        ProjectServices.GetById(projectId).then(function(response) {
            ctrl.project = response.data;

            if (sessionStorage.getItem('checkIsAdmin') !== 'true' && ctrl.project.Lead.Id !== sessionStorage.getItem('id')) {
                $location.path('/projects/' + ctrl.project.Id);
            }
        });

        IssuesServices.Create(issue)
            .then(function (response) {
                if (response.success) {
                    $location.path('/');
                } else {
                    ctrl.dataLoading = false;
                }

                $location.path('/projects/' + ctrl.project.Id)
            });
    }
}]);