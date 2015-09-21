angular.module('project-management.createProject', [])

.controller('CreateProjectController', ['$scope', '$state',
  function($scope, $state) {
    $scope.colors = [{name: 'red', hex: '#F44336'},{name: 'purple', hex: '#673AB7'},
    {name: 'dark blue', hex: '#3F51B5'},{name: 'blue', hex: '#2196F3'},
    {name: 'cyan', hex: '#00BCD4'},{name: 'green', hex: '#4CAF50'},
    {name: 'orange', hex: '#FF5722'}];

    $scope.chooseColor = function(name) {
      $scope.chosenColor = name;
    };

    $scope.goToProjects = function() {
      $state.go('projects');
    };

    $scope.createProject = function() {
      
    };
  }
]);
