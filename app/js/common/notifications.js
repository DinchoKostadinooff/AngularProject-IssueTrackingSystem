app.factory('NotificationsManager', [function() {
    return{
        success:function(msg){

         alert(msg);

        },
        error:function(msg) {

          alert(msg)
        }
    }

}]);
