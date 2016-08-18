angular.module('flapperNews')
.controller('MainCtrl', [
  '$scope',
  '$filter',
  'posts',
  'NgTableParams',
  function($scope, $filter, posts, NgTableParams){

    // Start mirroring the posts in this controller with the ones
    // in the factory with this data binding.
    $scope.posts = posts.posts;
    //$scope.tableParams = new NgTableParams({}, { dataset: posts});
    $scope.tableParams = new NgTableParams({
        page: 1,
        count: 10
    }, {
        total: $scope.posts.length,
        getData: function ($defer, params) {
           $scope.data = params.sorting() ? $filter('orderBy')($scope.posts, params.orderBy()) : $scope.posts;
           $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
           $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
           $defer.resolve($scope.data);
        }
    });

    // Data for the donut graph. Which widget has the most events?
    $scope.widgets = []; //["Config", "Admin", "Lock"]; $scope.labels2 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.event_count_by_widget = []; //[300, 500, 100];

    // Data for the bar chart. Which widgets are most used and by which customers?
    $scope.customers = []; //$scope.series = ['Series A', 'Series B'];
    $scope.event_count_by_widget_and_customer = [];

    // Extract data from the individual events into event counts by widget.
    for(i=0;i<$scope.posts.length;i++){

      // Test if the widget and the customer are found already from the extracted information.
      customer_index = $scope.customers.indexOf($scope.posts[i].host);
      widget_index = $scope.widgets.indexOf($scope.posts[i].widget);
      if( widget_index === -1){
        $scope.widgets.push($scope.posts[i].widget);
        $scope.event_count_by_widget.push($scope.posts[i].count);
      }else{
        $scope.event_count_by_widget[widget_index] += $scope.posts[i].count;
      }
      // Collect the amount of customers at the same time
      if( customer_index === -1 ){
        $scope.customers.push($scope.posts[i].host);
      }
    }

    // How many customers were there altogether?
    for(k=0;k<$scope.customers.length;k++){
      $scope.event_count_by_widget_and_customer.push([]);

      // How many widgets were there altogether?
      for(j=0;j<$scope.widgets.length;j++){
        $scope.event_count_by_widget_and_customer[k].push(0);
      }
    }

    // Extract click data from the individual events into event counts by customer and widget.
    for(l=0;l<$scope.posts.length;l++){
      if( $scope.posts[l].event_type === "click"){

        // Check the index of the customer and the widget.
        customer_index_2 = $scope.customers.indexOf($scope.posts[l].host);
        widget_index_2 = $scope.widgets.indexOf($scope.posts[l].widget);

        // Increase the count of the events for the right customer and widget.
        $scope.event_count_by_widget_and_customer[customer_index_2][widget_index_2] += $scope.posts[l].count;
      }
    }
    
    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; }

      posts.create({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
      });
      /*
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Good job guys!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everthing is wrong!', upvotes: 0}
        ]
      });
      */
      $scope.link = '';
      $scope.title = '';
    };

    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    };
  }
]);
