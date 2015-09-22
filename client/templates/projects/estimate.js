angular.module('project-management.estimate', [])

.controller('EstimateController', ['$scope', '$state', '$meteor',
  function($scope, $state, $meteor) {
    $scope.project = $meteor.object(Projects, $state.params.projectId);
  }
]);
