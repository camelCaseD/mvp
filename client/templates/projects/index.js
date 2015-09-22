angular.module('project-management.projects', [])

.controller('ProjectsController', ['$scope', '$meteor', '$state', 'Auth',
  function($scope, $meteor, $state, Auth) {
    Auth.isSignedOut();

    $scope.projects = $meteor.collection(Projects).subscribe('projects');

    $scope.goToProject = function(id) {
      $state.go('project', {_id: id});
    }
  }
]);
