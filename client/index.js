var app = angular.module('project-management', ['angular-meteor', 'ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'client/templates/home/index.ng.html',
        controller: 'HomeController'
      });
  }
]);

app.controller('HomeController', ['$scope',
  function($scope) {

  }
]);
