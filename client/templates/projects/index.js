angular.module('project-management.projects', [])

.controller('ProjectsController', ['$scope', '$state', 'Auth',
  function($scope, $state, Auth) {
    Auth.isSignedOut();
  }
]);
