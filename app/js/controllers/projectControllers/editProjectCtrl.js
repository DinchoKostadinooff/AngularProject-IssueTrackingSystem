app.controller('EditProjectController', ['ProjectServices', 'UserServices', '$location', '$routeParams', function (ProjectServices, UserServices, $location, $routeParams) {
    var ctrl = this;
    ctrl.edit = edit;
    ctrl.users = [];
    var id = $routeParams.id;
    ctrl.old = {};
    ctrl.project = {};


    UserServices.GetAll().then(function(response) {
        ctrl.users = response.data;
    });

    ProjectServices.GetById(id).then(function(response) {
        ctrl.old = response.data;
        ctrl.project.name = ctrl.old.Name;
        ctrl.project.description = ctrl.old.Description;
        ctrl.project.leader = ctrl.old.Lead.Id;
        ctrl.project.key = ctrl.old.ProjectKey;
        ctrl.project.labelsString = getLabelsString(ctrl.old.Labels);
        ctrl.project.prioritiesString = getPrioritiesString(ctrl.old.Priorities);

        if (sessionStorage.getItem('isAdmin') !== 'true' && ctrl.old.Lead.Id !== sessionStorage.getItem('id')) {
            $location.path('/projects/' + ctrl.old.Id);
        }
    });

    function edit() {
        ctrl.dataLoading = true;
        var name = ctrl.project.name;

        var projectForAdding = {
            Name: name,
            Description: ctrl.project.description,
            ProjectKey: ctrl.project.key,
            LeadId: ctrl.project.leader
        };

        var labelsSplit = ctrl.project.labelsString.split(' ');
        projectForAdding.labels = [];

        for (var i = 0; i < labelsSplit.length; i++) {
            if (labelsSplit[i] !== '') {
                projectForAdding.labels.push({Name: labelsSplit[i]});
            }
        }

        var prioritiesSplit = ctrl.project.prioritiesString.split(' ');
        projectForAdding.priorities = [];

        for (var e = 0; e < prioritiesSplit.length; e++) {
            if (prioritiesSplit[e] !== '') {
                projectForAdding.priorities.push({Name: prioritiesSplit[e]});
            }
        }

        ProjectServices.Edit(id, projectForAdding).then(function() {
            $location.path('/projects/' + id);
        });
    }

    function getLabelsString(labels) {
        var labelsString = '';

        for (var i = 0; i < labels.length; i++) {
            labelsString += labels[i].Name + ' ';
        }

        return labelsString;
    }

    function getPrioritiesString(priorities) {
        var prioritiesString = '';

        for (var i = 0; i < priorities.length; i++) {
            prioritiesString += priorities[i].Name + ' ';
        }

        return prioritiesString;
    }
}]);