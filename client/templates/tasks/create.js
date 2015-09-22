angular.module('project-management.createTask', [])

.controller('CreateTaskController', ['$scope', '$mdDialog', '$meteor', 'project',
  function($scope, $mdDialog, $meteor, project) {
    $scope.colors = [{name: 'red', hex: '#F44336'},{name: 'purple', hex: '#673AB7'},
    {name: 'dark blue', hex: '#3F51B5'},{name: 'blue', hex: '#2196F3'},
    {name: 'cyan', hex: '#00BCD4'},{name: 'green', hex: '#4CAF50'},
    {name: 'orange', hex: '#FF5722'}];

    $scope.task = {
      labels: []
    };

    $scope.closeDialog = $mdDialog.hide;

    $scope.chooseColor = function(color) {
      $scope.chosenColor = color;
    };

    $scope.createTask = function() {
      if ($scope.chosenColor) {
        $scope.task.color = $scope.chosenColor;

        $meteor.call('createTask', $scope.task, project._id)
          .then($mdDialog.hide, function(error) {
            console.error(error);
          });
      }
    }
  }
])

.controller('CreateSubTaskController', ['$scope', '$mdDialog', '$meteor', 'task',
  function($scope, $mdDialog, $meteor, task) {
    $scope.colors = [{name: 'red', hex: '#F44336'},{name: 'purple', hex: '#673AB7'},
    {name: 'dark blue', hex: '#3F51B5'},{name: 'blue', hex: '#2196F3'},
    {name: 'cyan', hex: '#00BCD4'},{name: 'green', hex: '#4CAF50'},
    {name: 'orange', hex: '#FF5722'}];

    $scope.task = {
      labels: []
    };

    $scope.closeDialog = $mdDialog.hide;

    $scope.chooseColor = function(color) {
      $scope.chosenColor = color;
    };

    $scope.createTask = function() {
      if ($scope.chosenColor) {
        $scope.task.color = $scope.chosenColor;

        $meteor.call('createSubTask', $scope.task, task)
          .then($mdDialog.hide, function(error) {
            console.error(error);
          });
      }
    }
  }
]);
