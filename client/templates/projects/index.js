angular.module('project-management.projects', [])

.controller('ProjectsController', ['$scope', '$meteor', 'Auth',
  function($scope, $meteor, Auth) {
    Auth.isSignedOut();

    $scope.projects = $meteor.collection(Projects);
  }
]);
