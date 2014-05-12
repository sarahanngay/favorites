var favorites = angular.module('favorites', []);

function mainController($scope, $http) {
  $scope.list = $http.get('/list')
        .success(function(data) {
          $scope.list = data;
          console.log(data)
        })
        .error(function(error) {
          if (error) {
            console.log(error);
          }
        })

}