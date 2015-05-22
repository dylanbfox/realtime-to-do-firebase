angular.module('myApp.dashboard', ['ngRoute'])

.run(["$rootScope", "$location", "$route", "$routeParams", function($rootScope, $location, $route, $routeParams) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  console.log("error");
  if (error === "AUTH_REQUIRED") {
    $location.path("/home");
  }
});

$rootScope.$on("$routeChangeStart", function(event){
	if ($routeParams.listId){
		console.log("reset connection");
		Firebase.goOffline();
		Firebase.goOnline();
	}
});
}])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/dashboard/', {
		templateUrl: 'dashboard/dashboard.html',
		controller: 'DashboardCtrl',
		resolve: {
			"currentAuth": ['Auth', function(Auth){
				return Auth.$requireAuth();
			}]
		}
	});
}])

.controller('DashboardCtrl', ['$scope', 'currentAuth', 'FURL', '$firebaseArray',
	function($scope, currentAuth, FURL, $firebaseArray){
		var ref = new Firebase(FURL)
		var listsRef = ref.child('lists');

		$scope.userLists = $firebaseArray(listsRef.orderByChild("uid").equalTo(currentAuth.uid));
		$scope.test = true;
		$scope.userEmail = currentAuth.password.email;
}]);
