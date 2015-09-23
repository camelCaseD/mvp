angular.module('project-management.viewEstimate', [])

.controller('ViewEstimateController', ['$scope', '$state',
  function($scope, $state) {
    $scope.$meteorSubscribe('estimate', $state.params.estimateId)
      .then(function(handle) {
        Tracker.autorun(function(){
          $scope.estimate = Estimates.findOne({_id: $state.params.estimateId});
        });

        $scope.$$subTasks();
      });

    $scope.$meteorSubscribe('projects')
      .then(function(handle) {
        $scope.project = Projects.findOne({_id: $state.params.projectId});
      });

    $scope.$$subTasks = function() {
      $scope.$meteorSubscribe('tasks', $scope.estimate.projectId)
        .then(function(handle) {
          Tracker.autorun(function(){
            $scope.tasks = Tasks.find({projectId: $scope.estimate.projectId}).fetch();

            console.log($scope.tasks)
          });
        });
    };
  }
]);
