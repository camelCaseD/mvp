angular.module('project-management.directives.color-picker', [])

.directive('colorPicker', [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'client/templates/directives/color-picker.ng.html'
    };
  }
]);
