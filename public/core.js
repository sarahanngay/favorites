var favorites = angular.module('favorites', ['google-maps']);

function mainController($scope, $http, $window) {
  // set some scope variables
  $scope.list = []; 
  $scope.markers = [];
  $scope.new_address = {};
  $scope.map = {
    center: {
      latitude: 39,
      longitude: -98
    },
    zoom: 3
  };

  // function to create the array of map markers
  $scope.createMarkers = function(list) {
    for (var i = list.length - 1; i >= 0; i--) {
      var obj = {
        latitude: list[i].latitude,
        longitude: list[i].longitude
      };
      $scope.markers.push(obj);
    };

  }

  // function to get the list of all locations
  $scope.getList = function() {
    // reset the markers list
    $scope.markers = [];
    $http.get('/list')
            .success(function(data) {
              // on success set the list
              $scope.list = data;

              // also update the markers array
              $scope.createMarkers(data);
            })
            .error(function(error) {
              if (error) {
                console.log(error);
              }
            })      
  }

  // on page load update list
  $scope.getList();

  // function to remove a location
  $scope.remove = function(id) {
    $http.delete('/location/' + id)
        .success(function(data) {
          alert(data);
          // update scope list
          $scope.list = $scope.getList();
        })
        .error(function(error) {
          alert(error);
        })
  } 

  // function to update existing address
  $scope.update = function(address) {
    address = address || {};
    
    // create the body to update
    var updated = {
      name: address.name,
      id: address._id,
      line: address.line,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country
    };


    $http.put('/', updated)
        .success(function(data) {
          var alert_txt = data;
          if(typeof alert_txt === 'object') {
            alert_txt = data.message;
          }

          alert(alert_txt);

          // reset the scope list
          $scope.list = $scope.getList();
        })
        .error(function(error) {
          alert(error);
        })
  }

  // function to add a new location
  $scope.add = function(address) {
    address = address || {};
    address.line = [];
    address.line.push(address.line1);

    // remove values we don't need to sent to backend
    delete address.line1;

    // if there is a line 2, push it into the line array
    if (address.line2) {
      address.line.push(address.line2);
      delete address.line2;
    }

    $http.post('/', address)
        .success(function(data) {
          alert(data);
          $scope.list = $scope.getList();
          $scope.new_address = {};
        })
        .error(function(data) {
          var retval = data;

          if(typeof data === 'object') {
            retval = data.message;
          }

          alert(retval);
        })
  }
}