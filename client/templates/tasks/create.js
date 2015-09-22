angular.module('project-management.createTask', [])

.controller('CreateTaskController', ['$scope', '$mdDialog', 'project',
  function($scope, $mdDialog, project) {
    $scope.colors = [{name: 'red', hex: '#F44336'},{name: 'purple', hex: '#673AB7'},
    {name: 'dark blue', hex: '#3F51B5'},{name: 'blue', hex: '#2196F3'},
    {name: 'cyan', hex: '#00BCD4'},{name: 'green', hex: '#4CAF50'},
    {name: 'orange', hex: '#FF5722'}];

    $scope.task = {};

    $scope.closeDialog = $mdDialog.hide;

    $scope.chooseColor = function(color) {
      $scope.chosenColor = color;
    };

    $scope.createTask = function() {
      if ($scope.chosenColor) {
        $scope.task.color = $scope.chosenColor;
        $scope.task.projectId = project._id;

        Tasks.insert($scope.task, function(error, id) {
          if (error) {
            console.error(error);
          } else {
            $mdDialog.hide();
          }
        });
      }
    }
  }
]);
