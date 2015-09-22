angular.module('project-management.createTask', [])

.controller('CreateTaskController', ['$scope', '$mdDialog', 'project',
  function($scope, $mdDialog, project) {
    $scope.task = {};

    $scope.closeDialog = $mdDialog.hide;
  }
]);
