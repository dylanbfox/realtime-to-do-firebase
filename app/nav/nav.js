'use strict';

angular.module('myApp.nav', [])

.controller('NavCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth){
	Auth.$onAuth(function(authData){
		// will be null if user is not logged in
		$scope.authData = authData;
	});

	$scope.authAction = "login"; 

	$scope.register = function(){
		Auth.$createUser({
			email: $scope.newUser.email,
			password: $scope.newUser.password
		})
		.then(function(userData){
			return Auth.$authWithPassword({
				email: $scope.newUser.email,
				password: $scope.newUser.password,
			});
		})
		.then(function(authData){
			$location.path('/dashboard');
		})
		.catch(function(error){
			$scope.error = error;
		});
	};

	$scope.login = function(){
		Auth.$authWithPassword({
			email: $scope.user.email,
			password: $scope.user.password,
		}).then(function(authData){
			$location.path('/dashboard');
		}).catch(function(error){
			$scope.user = {};
			$scope.error = error;
		});
	};
}]);