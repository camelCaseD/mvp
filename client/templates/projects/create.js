angular.module('project-management.createProject', [])

.controller('CreateProjectController', ['$scope', '$state', '$meteor',
  function($scope, $state, $meteor) {
    $scope.colors = [{name: 'red', hex: '#F44336'},{name: 'purple', hex: '#673AB7'},
    {name: 'dark blue', hex: '#3F51B5'},{name: 'blue', hex: '#2196F3'},
    {name: 'cyan', hex: '#00BCD4'},{name: 'green', hex: '#4CAF50'},
    {name: 'orange', hex: '#FF5722'}];

    $scope.project = {};

    $scope.chooseColor = function(name) {
      $scope.chosenColor = name;
    };

    $scope.goToProjects = function() {
      $state.go('projects');
    };

    $scope.createProject = function() {
      if ($scope.chosenColor) {
        $scope.project.color = $scope.chosenColor;

        $meteor.call('createProject', $scope.project)
          .then(function() { $state.go('projects'); }, function(error) {
            console.error(error);
          });
      }
    };
  }
]);
