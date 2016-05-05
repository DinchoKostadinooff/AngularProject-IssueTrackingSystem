app.factory('AuthCheck', [function() {

    function checkIsAdmin() {
        if (!sessionStorage.getItem('token')) {
            return false;
        }
        return sessionStorage.getItem('checkIsAdmin');
    }
    function checkIsLoggedIn() {
		return sessionStorage.getItem('token');
    }


    return {
    	checkIsAdmin: checkIsAdmin,
        checkIsLoggedIn: checkIsLoggedIn
    }
}]);