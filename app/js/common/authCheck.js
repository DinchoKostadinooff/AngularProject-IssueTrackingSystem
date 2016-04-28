app.factory('AuthCheck', [function() {
    function isLoggedIn() {
		return sessionStorage.getItem('token');
    }

    function isAdmin() {
    	if (!sessionStorage.getItem('token')) {
    		return false;
    	}

    	return sessionStorage.getItem('isAdmin');
    }

    return {
    	isLoggedIn: isLoggedIn,
    	isAdmin: isAdmin
    }
}]);