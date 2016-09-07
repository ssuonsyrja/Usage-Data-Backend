angular.module('flapperNews')
.controller('EventsCtrl', [
  '$scope',
  'events',
  'event',
  function($scope, events, event) {
    $scope.event = event;

  }
]);
