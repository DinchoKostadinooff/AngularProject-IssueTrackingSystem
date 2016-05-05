app.controller('AddProjectController', ['ProjectServices', 'UserServices', '$location', function (ProjectServices, UserServices, $location) {
    var controller = this;
    controller.add = add;
    controller.users = [];

    UserServices.GetAll().then(function(response) {
        controller.users = response.data;
    });

    function add() {
        controller.dataLoading = true;
        var name = controller.project.name;

        var projectForAdding = {
            Name: name,
            Description: controller.project.description,
            ProjectKey: controller.project.key,
            LeadId: controller.project.leader
        };

        var labelsSplit = controller.project.labelsString.split(' ');
        projectForAdding.labels = [];

        for (var i = 0; i < labelsSplit.length; i++) {
            projectForAdding.labels.push({ Name: labelsSplit[i] });
        }

        var prioritiesSplit = controller.project.prioritiesString.split(' ');
        projectForAdding.priorities = [];

        for (var e = 0; e < prioritiesSplit.length; e++) {
            projectForAdding.priorities.push({Name: prioritiesSplit[e]});
        }
        
        ProjectServices.Create(projectForAdding)
            .then(function (response) {
                $location.path('/projects/' + response.data.Id);
            });
    }
}]);