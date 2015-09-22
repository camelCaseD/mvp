angular.module('project-management.showProject', [])

.controller('ProjectController', ['$scope', '$state', '$meteor',
  function($scope, $state, $meteor) {
    $scope.project = $meteor.object(Projects, $state.params._id);

    $scope.tasks = $meteor.collection(Tasks).subscribe('tasks', $scope.project._id);
  }
]);