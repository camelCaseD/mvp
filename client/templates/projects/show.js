angular.module('project-management.showProject', ['project-management.createTask'])

.controller('ProjectController', ['$scope', '$state', '$meteor', '$mdDialog',
  function($scope, $state, $meteor, $mdDialog) {
    $scope.project = $meteor.object(Projects, $state.params._id);

    $scope.tasks = $meteor.collection(Tasks).subscribe('tasks', $scope.project._id);

    $scope.createTask = function($event) {
      $mdDialog.show({
        parentEl: angular.element(document.body),
        targetEvent: $event,
        templateUrl: 'client/templates/tasks/create.ng.html',
        locals: {
          project: $scope.project
        },
        controller: 'CreateTaskController'
      });
    };
  }
]);
