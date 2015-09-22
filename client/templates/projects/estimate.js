angular.module('project-management.estimate', [])

.controller('EstimateController', ['$scope', '$state', '$meteor',
  function($scope, $state, $meteor) {
    var taskHandler;

    $scope.project = $meteor.object(Projects, $state.params.projectId);

    $scope.$meteorSubscribe('estimateData', $scope.project._id)
      .then(function(handle) {
        Tracker.autorun(function() {
          $scope.tasks = Tasks.find({projectId: $scope.project._id}).fetch();

          console.log($scope.tasks);
        });

        taskHandler = handle;
      });

    $scope.cancel = function() {
      taskHandler.stop();

      $state.go('project', {_id: $scope.project._id});
    }

    $scope.generate = function() {
      $meteor.call('createEstimate', $scope.tasks, $scope.project._id)
        .then(function(estimateId) {
          $state.go('view', {projectId: $scope.project._id, estimateId: estimateId});
        }, function(error) {
          console.error(error);
        });
    }
  }
]);
