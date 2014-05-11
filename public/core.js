var favorites = angular.module('favorites', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $scope.logText = function() {
    $http.get('/list')
        .success(function(data) {
          var retval = '';
          for (var i = data.length - 1; i >= 0; i--) {
            retval =+ 'tr';
          };
          $scope.list = retval;
        })
        .error(function(error) {
          if (error) {
            console.log(error);
          }
        })
  };

}