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

    $scope.updateTask = function(task) {
      Tasks.update({_id: task._id}, {$set: {done: task.done}});
    };

    $scope.removeTask = function(task, $event) {
      $event.stopPropagation();

      var confirm = $mdDialog.confirm()
        .ok('Yes, delete the task')
        .cancel('No, don\'t delte the task')
        .title('Delete task')
        .content('This will delete the task and all of it\'s sub tasks, are you sure you want to do that?');

      $mdDialog.show(confirm)
        .then(function() {
          Tasks.remove({_id: task._id});
        });
    };

    $scope.addSubTask = function(task, $event) {
      $event.stopPropagation();

      $mdDialog.show({
        parentEl: angular.element(document.body),
        targetEvent: $event,
        templateUrl: 'client/templates/tasks/create.ng.html',
        locals: {
          task: task
        },
        controller: 'CreateSubTaskController'
      });
    };
  }
]);
