angular.module('project-management.viewEstimate', [])

.controller('ViewEstimateController', ['$scope', '$state',
  function($scope, $state) {
    $scope.$meteorSubscribe('estimate', $state.params.estimateId)
      .then(function(handle) {
        Tracker.autorun(function(){
          $scope.estimate = Estimates.findOne({_id: $state.params.estimateId});
        });
      });
  }
]);
