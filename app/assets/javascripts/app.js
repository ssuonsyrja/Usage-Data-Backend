angular.module('flapperNews', ['ngTable', 'chart.js', 'ui.router', 'templates'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
      resolve: {
        eventPromise: ['events', function(events){
          return events.getAll();
        }]
      }
    })
    .state('events', {
      url: '/events/{id}',
      templateUrl: 'events/_events.html',
      controller: 'EventsCtrl',
      resolve: {
        event: ['$stateParams', 'events', function($stateParams, events) {
          return events.get($stateParams.id);
        }]
      }
    });

    $urlRouterProvider.otherwise('home');
  }
]);
