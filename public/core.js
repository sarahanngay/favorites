var favorites = angular.module('favorites', []);

function mainController($scope, $http, $window) {


  $scope.list = $http.get('/list')
        .success(function(data) {
          $scope.list = data;
        })
        .error(function(error) {
          if (error) {
            console.log(error);
          }
        })

    $scope.remove = function(id) {
      $http.delete('/location/' + id)
          .success(function(data) {
            alert(data);
            $window.location.reload();
          })
          .error(function(error) {
            alert(error);
          })
    } 

    $scope.update = function(address) {
      console.log(address);
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
            $window.location.reload();
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