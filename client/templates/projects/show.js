var tasksHandler = [];

angular.module('project-management.showProject', ['project-management.createTask', 'project-management.clockTask'])

.controller('ProjectController', ['$scope', '$state', '$meteor', '$mdDialog',
  function($scope, $state, $meteor, $mdDialog) {
    $scope.project = $meteor.object(Projects, $state.params._id);

    $scope.$meteorSubscribe('tasks', $scope.project._id)
      .then(function(handler) {
        Tracker.autorun(function() {
          var tasks = Tasks.find({projectId: $scope.project._id});
          $scope.tasks = tasks.fetch();
        });

        tasksHandler.push(handler);
      });

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

    $scope.removeTask = function(task, $event, isSubTask) {
      $event.stopPropagation();

      var paragraph = !isSubTask ? 'This will delete the task and all of it\'s sub tasks, are you sure you want to do that?' : 'This will delete only this subtask.';

      var confirm = $mdDialog.confirm()
        .ok('Yes, delete the task')
        .cancel('No, don\'t delte the task')
        .title('Delete task')
        .content(paragraph);

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

    $scope.removeProject = function(project) {
      var confirm = $mdDialog.confirm()
        .ok('Yes, delete the project')
        .cancel('No, don\'t delte the project')
        .title('Delete project')
        .content('This will delete the project and all of it\'s tasks, are you sure you want to do that?');

      $mdDialog.show(confirm)
        .then(function() {
          $meteor.call('removeProject', project._id)
            .then(function() {
              $state.go('projects');
            }, function(error) {
              console.error(error);
            });
        });
    };

    $scope.clockTask = function(task, $event) {
      $event.stopPropagation();

      $mdDialog.show({
        parentEl: angular.element(document.body),
        targetEvent: $event,
        templateUrl: 'client/templates/tasks/clock.ng.html',
        locals: {
          task: task
        },
        controller: 'ClockTaskController'
      });
    };

    $scope.estimate = function(project) {
      tasksHandler.forEach(function(handler) {
        handler.stop();
      });

      $state.go('estimate', {projectId: project._id});
    };

    $scope.hasSubTasks = function(task) {
      return Tasks.find({taskId: task._id}).count() > 0;
    };
  }
])

.controller('SubTaskController', ['$scope', '$meteor',
  function($scope, $meteor) {
    $scope.$meteorSubscribe('subTasks', $scope.$parent.task._id)
      .then(function(handler) {
        Tracker.autorun(function() {
          var tasks = Tasks.find({taskId: $scope.$parent.task._id});
          $scope.subTasks = tasks.fetch();
        });

        tasksHandler.push(handler);
      });
  }
]);
