'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/lists/:listId', {
		templateUrl: 'list/list.html',
		controller: 'ListCtrl',
	});
}])

.controller('ListCtrl', ['$scope', '$routeParams', '$location', 'Auth', '$firebaseArray', '$firebaseObject', 'FURL', 
	function($scope, $routeParams, $location, Auth, $firebaseArray, $firebaseObject, FURL){
		var ref = new Firebase(FURL);
		var listId = $routeParams.listId;
		var listRef = ref.child('lists').child(listId);
		var tasksRef = listRef.child('tasks');
		var activeUsersRef = listRef.child('activeUsers');
		var authData = Auth.$getAuth();

		$scope.tasks = $firebaseArray(tasksRef);
		$scope.activeUsers = $firebaseArray(activeUsersRef);
		$scope.list = $firebaseObject(listRef);
		$scope.list.$bindTo($scope, "list")
		$scope.editTitle = false;

		// add activeUser connection
		var activeUserRef = activeUsersRef.push({
			username: authData ? authData.password.email : "Guest"
		});

		// detect connection state
		var amOnline = ref.child('.info/connected');
		amOnline.on("value", function(snapshot){
			if (!snapshot.val()){
				return false
			}
			activeUserRef.onDisconnect().remove();
		});		

		$scope.list.$loaded().then(function(data){
			// if not logged in and list is private
			if (data.isPrivate && authData === null){
				$location.path('/');
			}
			// if logged in and data is private BUT user isn't owner
			else if (authData && authData.uid != data.uid && data.isPrivate){
				$location.path('/');
			}
		});	

		$scope.toggleEditTitle = function(){
			if ($scope.editTitle === true){
				// turn off editing
				$scope.editTitle = false;
				$scope.list.editTitleLocked = false;
			} else {
				// turn on editing
				// but check for concurrent edits first
				if (!$scope.list.editTitleLocked){
					$scope.editTitle = true;
					$scope.list.editTitleLocked = true;			
				}
			}
		};

		$scope.isOwner = function(){
			if (!authData){
				return false
			}
			return authData && authData.uid === $scope.list.uid;
		}

		$scope.togglePrivate = function(){
			if ($scope.list.isPrivate){
				$scope.list.isPrivate = false;
			} else {
				$scope.list.isPrivate = true;				
			}
		}

		$scope.addTask = function(){
			$scope.tasks.$add($scope.task);
			$scope.task.title = '';
		};

		$scope.removeTask = function(task){
			$scope.tasks.$remove(task);
		};
}]);