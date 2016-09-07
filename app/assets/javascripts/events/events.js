angular.module('flapperNews')
.factory('events', [
  '$http',
  function($http){
    var o = {
      events: []
    };

    o.get = function(id) {
      return $http.get('/events/' + id + '.json').then(function(res){
        return res.data;
      });
    };

    o.getAll = function() {
      return $http.get('/events.json').success(function(data){
        angular.copy(data, o.events);
      });
    };

    o.create = function(event) {
      return $http.event('/events.json', event).success(function(data){
        o.events.push(data);
      });
    };

    o.upvote = function(event) {
      return $http.put('/events/' + event.id + '/upvote.json')
        .success(function(data){
          event.upvotes += 1;
        });
    };

    return o;
  }
]);
