'use strict';

angular.module('myApp.auth', [])

.factory('Auth', ['FURL', '$firebaseAuth', function(FURL, $firebaseAuth){
	var ref = new Firebase(FURL);
	var auth = $firebaseAuth(ref);
	return auth;
}]);