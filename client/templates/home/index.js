angular.module('project-management.home', [])

.controller('HomeController', ['$scope', '$state', 'Auth',
  function($scope, $state, Auth) {
    Auth.isSignedIn();
  }
]);
