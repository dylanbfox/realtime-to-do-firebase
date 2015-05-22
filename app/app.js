'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'firebase', 
  'myApp.version',
  'myApp.home',
  'myApp.list',
  'myApp.nav',
  'myApp.auth',
  'myApp.dashboard',
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])

.constant('FURL', 'https://realtime-to-do.firebaseio.com/');
