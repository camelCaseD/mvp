angular.module('project-management.estimate', [])

.controller('EstimateController', ['$scope', '$state', '$meteor',
  function($scope, $state, $meteor) {
    var taskHandler;

    $scope.project = $meteor.object(Projects, $state.params.projectId);

    $scope.$meteorSubscribe('estimateData', $scope.project._id)
      .then(function(handle) {
        $scope.tasks = $meteor.collection(Tasks);

        taskHandler = handle;
      });

    $scope.cancel = function() {
      taskHandler.stop();

      $state.go('project', {_id: $scope.project._id});
    }
  }
]);
