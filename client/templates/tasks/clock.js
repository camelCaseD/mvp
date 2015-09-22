angular.module('project-management.clockTask', [])

.controller('ClockTaskController', ['$scope', '$mdDialog', '$meteor', 'task',
  function($scope, $mdDialog, $meteor, task) {
    $scope.closeDialog = $mdDialog.hide;

    $scope.task = {
      hours: task.hours
    };

    $scope.clock = function() {
      if ($scope.task.newHours && $scope.task.newHours > 0) {
        $meteor.call('clock', task._id, $scope.task.newHours)
          .then($mdDialog.hide, function(error) {
            console.error(error);
          });
      }
    }
  }
]);
