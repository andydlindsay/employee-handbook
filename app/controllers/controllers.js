/*global angular*/
angular.module('controllers',['schemaForm'])

.controller('controller2', ['$scope', function($scope) { 
    $scope.message = "About page message";
    $scope.title = "About";
}])

.controller('controller3', ['$scope', function($scope) { 
    // test
    $scope.message = "About page message";
    $scope.title = "About";
}])

.controller('navbarController', ['$scope', '$http', function($scope, $http){
    $http.get('api/company')
    .then(function(response) {
        $scope.company = response.data;
    });
}]);