var app = angular.module('project-management', ['angular-meteor', 'ui.router', 'ngMaterial']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'client/templates/home/index.ng.html',
        controller: 'HomeController'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'client/templates/projects/index.ng.html',
        controller: 'ProjectsController',
        resolve: {
          'currentUser': ['$meteor',
            function($meteor) {
              return $meteor.requireUser();
            }
          ]
        }
      });

    $urlRouterProvider.otherwise('/projects');
  }
]);

app.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('stateChangeError', function(event, next, previous, error) {
      if (error === 'AUTH_REQUIRED') {
        $state.go('/');
      }
    });
  }
])

app.controller('HomeController', ['$scope',
  function($scope) {

  }
]);

app.controller('ProjectsController', ['$scope', '$meteor',
  function($scope, $meteor) {

  }
]);
