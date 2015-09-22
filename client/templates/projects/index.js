angular.module('project-management.projects', [])

.controller('ProjectsController', ['$scope', '$meteor', '$state', '$mdDialog', 'Auth',
  function($scope, $meteor, $state, $mdDialog, Auth) {
    Auth.isSignedOut();

    $scope.projects = $meteor.collection(Projects).subscribe('projects');

    $scope.goToProject = function(id) {
      $state.go('project', {_id: id});
    }

    $scope.removeProject = function(project, $event) {
      $event.stopPropagation();

      var confirm = $mdDialog.confirm()
        .ok('Yes, delete the project')
        .cancel('No, don\'t delte the project')
        .title('Delete project')
        .content('This will delete the project and all of it\'s tasks, are you sure you want to do that?');

      $mdDialog.show(confirm)
        .then(function() {
          $meteor.call('removeProject', project)
            .then(null, function(error) {
              console.error(error);
            });
        });
    };
  }
]);
