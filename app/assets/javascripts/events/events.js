angular.module('flapperNews')
.factory('events', [
  '$http',
  function($http){
    var o = {

      events: [
        /*
        {title: 'First Event', link: '#home', upvotes: 0,
          comments: [{author: 'Joe', body: 'Good job guys!', upvotes: 0}]
        },
        {title: 'Second Event', link: '#home', upvotes: 0,
          comments: [{author: 'Joe', body: 'Good job guys!', upvotes: 0}]
        }
        */
      ]
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

    o.addComment = function(id, comment) {
      return $http.event('/events/' + id + '/comments.json', comment)
    };

    o.upvoteComment = function(event, comment) {
      return $http.put('/events/' + event.id + '/comments/' + comment.id + '/upvote.json')
        .success(function(data){
          comment.upvotes += 1;
        });
    };

    return o;
  }
]);
