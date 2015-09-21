angular.module('project-management.auth', [])

.factory('Auth', ['$state',
  function($state) {
    return {
      isSignedIn: function() {
        Tracker.autorun(function() {
          if (Meteor.user()) {
            $state.go('projects');
          }
        });
      },

      isSignedOut: function() {
        Tracker.autorun(function() {
          if (!Meteor.user()) {
            $state.go('home');
          }
        });
      }
    };
  }
]);
