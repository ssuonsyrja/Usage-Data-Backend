angular.module('flapperNews')
.controller('EventsCtrl', [
  '$scope',
  'events',
  'event',
  function($scope, events, event) {
    $scope.event = event;

    $scope.addComment = function() {
      if( !$scope.body || $scope.body === '') { return; }

      events.addComment(event.id, {
        body: $scope.body,
        upvotes: 0
      }).success(function(comment) {
        $scope.event.comments.push(comment);
      });

      $scope.body = '';
    };

    $scope.incrementUpvotes = function(comment) {
      events.upvoteComment(event, comment);
    };

  }
]);
