app.controller('AllProjectsCtrl', ['ProjectServices', function (ProjectServices) {
    var ctrl = this;
    ctrl.projects = [];

    ProjectServices.GetAll().then(function(res) {
        ctrl.projects = res.data;
    });
}]);