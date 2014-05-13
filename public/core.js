var favorites = angular.module('favorites', []);

function mainController($scope, $http, $window) {


  $scope.list = []; 

    $scope.getList = function() {
      $http.get('/list')
              .success(function(data) {
                $scope.list = data;
              })
              .error(function(error) {
                if (error) {
                  console.log(error);
                }
              })      
    }

    $scope.getList();

    $scope.remove = function(id) {
      $http.delete('/location/' + id)
          .success(function(data) {
            alert(data);
            $scope.list = $scope.getList();
          })
          .error(function(error) {
            alert(error);
          })
    } 

    $scope.update = function(address) {
      address = address || {};
      
      var updated = {
        name: address.name,
        id: address._id,
        line: address.line,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country
      };

      console.log(updated)

      $http.put('/', updated)
          .success(function(data) {
            var alert_txt = data;
            if(typeof alert_txt === 'object') {
              alert_txt = "Required inputs are missing";
            }

            alert(alert_txt);
            
            $scope.list = $scope.getList();
          })
          .error(function(error) {
            alert(error);
          })
    }

    $scope.add = function(address) {
      address = address || {};
      address.line = [];
      address.line.push(address.line1);

      delete address.line1;

      if (address.line2) {
        address.line.push(address.line2);
        delete address.line2;
      }

      $http.post('/', address)
          .success(function(data) {
            alert(data);
            $scope.list = $scope.getList();
          })
          .error(function(data) {
            var retval = data;
            if(typeof data === 'object') {
              retval = "Required inputs are missing";
            }

            alert(retval);
          })
    }
}