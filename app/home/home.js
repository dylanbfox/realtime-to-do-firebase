'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl',
	});
}])

.controller('HomeCtrl', ['$scope', '$location', '$firebaseArray', '$firebaseObject', 'Auth', 'FURL', 
	function($scope, $location, $firebaseArray, $firebaseObject, Auth, FURL){
		$scope.createList = function(){
			// create new ref in Firebase
			var ref = new Firebase(FURL);
			var listsRef = ref.child('lists');
			var lists = $firebaseArray(listsRef);
			var list = {};
			var authData = Auth.$getAuth();
			
			list.created = Firebase.ServerValue.TIMESTAMP;
			list.tasks = 0;
			list.title = "Undefined";

			if (authData){
				list.uid = authData.uid;
				console.log(":"+ list.uid);
				list.owner = authData.password.email;
			}

			lists.$add(list)
			 .then(function(ref){
			 	// redirect to list
			 	$location.path('/lists/' + ref.key());
			 });			
		}
}]);