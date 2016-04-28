app.factory('notifier',[function(){
    return{
        success:function(msg){
            noty({
                theme: 'relax',
                text: msg,
                type: 'success',
                timeout: 2000,
                closeWith: ['click']
            });
        },
        error:function(msg) {
            noty({
                theme: 'relax',
                text: msg,
                type: 'error',
                timeout: 2000,
                closeWith: ['click']
            });
        }
    }
}]);