app.controller('EditIssueController', ['IssuesServices', 'ProjectServices', 'UserServices', '$location', '$routeParams', function (IssuesServices, ProjectServices, UserServices, $location, $routeParams) {
    var controller = this;
    var id = $routeParams.id;
    var currentUserId = sessionStorage.getItem('id');
    controller.edit = edit;
    controller.changeStatus = changeStatus;

    controller.users = [];
    controller.old = {};
    controller.issue = {};
    controller.project = {};
    controller.priorities = [];
    controller.statuses = [];

    IssuesServices.GetById(id).then(function(response) {
        controller.old = response.data;
        controller.issue.title = controller.old.Title;
        controller.issue.description = controller.old.Description;
        controller.issue.assignee = controller.old.Assignee.Id;
        controller.issue.labelsString = getLabelsString(controller.old.Labels);
        controller.statuses = controller.old.AvailableStatuses;

        ProjectServices.GetById(controller.old.Project.Id).then(function(response) {
            controller.project = response.data;
            controller.priorities = controller.project.Priorities;

            if (sessionStorage.getItem('isAdmin') !== 'true' && (controller.project.Lead.Id !== currentUserId && controller.old.Assignee.Id !== currentUserId)) {
                $location.path('/issues/' + controller.old.Id)
            }
        });
    });

    UserServices.GetAll().then(function(response) {
        controller.users = response.data;
    });

    function edit() {
        if (sessionStorage.getItem('isAdmin') === 'true' || controller.project.Lead.Id === currentUserId) {
            var issueForAdding = {
                Title: controller.issue.title,
                Description: controller.issue.description,
                DueDate: controller.issue.duedate,
                AssigneeId: controller.issue.assignee,
                PriorityId: controller.issue.priority
            };

            var labelsSplit = controller.issue.labelsString.split(' ');
            issueForAdding.labels = [];

            for (var i = 0; i < labelsSplit.length; i++) {
                if (labelsSplit[i] !== '') {
                    issueForAdding.labels.push({Name: labelsSplit[i]});
                }
            }

            IssuesServices.Edit(id, issueForAdding).then(function () {
                $location.path('/issues/' + id);
            });
        }

        if (controller.issue.status !== undefined) {
            controller.changeStatus();
        }

        $location.path('/issues/' + id);
    }

    function changeStatus() {
        IssuesServices.EditStatus(id, controller.issue.status);
    }

    function getLabelsString(labels) {
        var labelsString = '';

        for (var i = 0; i < labels.length; i++) {
            labelsString += labels[i].Name + ' ';
        }

        return labelsString;
    }
}]);