angular.module('project-management.projects', [])

.controller('ProjectsController', ['$scope', 'Auth',
  function($scope, Auth) {
    Auth.isSignedOut();
  }
]);
