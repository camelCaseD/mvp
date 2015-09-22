angular.module('project-management.showProject', ['project-management.createTask'])

.controller('ProjectController', ['$scope', '$state', '$meteor', '$mdDialog',
  function($scope, $state, $meteor, $mdDialog) {
    $scope.project = $meteor.object(Projects, $state.params._id);

    $scope.tasks = $meteor.collection(function() { return Tasks.find({projectId: $scope.project._id}); }).subscribe('tasks', $scope.project._id);

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
      $meteor.call('markTaskAsDone', task)
        .then(null, function(error) {
          console.error(error);
        });
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
          $meteor.call('removeTask', task)
            .then(null, function(error) {
              console.error(error);
            });
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
])

.controller('SubTaskController', ['$scope', '$meteor',
  function($scope, $meteor) {
    $scope.subTasks = $meteor.collection(function() { return Tasks.find({taskId: $scope.$parent.task._id}); }).subscribe('subTasks', $scope.$parent.task._id);
  }
]);
