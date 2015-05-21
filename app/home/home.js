'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl',
	});
}])

.controller('HomeCtrl', ['$scope', function($scope){
	$scope.welcome = "Welcome to the Real Time To-Do site!";
}]);