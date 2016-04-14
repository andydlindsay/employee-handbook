/*global angular*/
angular.module('controllers')

.controller('controller4', ['$scope', '$resource', '$http', function($scope, $resource, $http) { 
    $scope.pageClass = "page-category";
    $http.get('/api/category')
    .then(function(response) {
        $scope.contents = response.data;
    });
}]) 

.controller('chapterDetail', ['$scope', '$routeParams', '$resource', '$http', function($scope, $routeParams, $resource, $http) {
    $scope.pageClass = "page-category";
    $http.get('/api/category/' + $routeParams.id)
    .then(function(response) {
        $scope.chapter = response.data; 
    });
}])

.controller('chapterNew', ['$scope', '$http', '$window', 'catCount', function($scope, $http, $window, catCount){
    var count = catCount;
    $scope.categorycount = count;
    var maxOrder = Number(count) + 1;
    $scope.category = {};
    $scope.categoryFields = [
        {
            key: 'title',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Title',
                placeholder: 'Chapter title...',
                required: true
            }
        }, {
            key: 'desc',
            type: 'textarea',
            templateOptions: {
                label: 'Description',
                placeholder: 'Chapter description...',
                required: true
            }
        }, {
            key: 'order',
            type: 'input',
            defaultValue: maxOrder,
            templateOptions: {
                type: 'number',
                min: '1',
                max: maxOrder,
                label: 'Display Order',
                required: true
            }
        }, {
            key: 'image',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Image',
                placeholder: 'Image url...',
                required: false
            }
        }, {
            key: 'active',
            type: 'checkbox',
            defaultValue: true,
            templateOptions: {
                label: 'Active'
            }
        }    
    ];
    $scope.onSubmit = function() {
        $http.post('/api/category', $scope.category)
        .success(function(data) {
            $window.location.href = '#/';
        })
        .error(function() {});
    };
}])

.controller('chapterDelete', ['$routeParams', '$http', '$window', function($routeParams, $http, $window) {
    $http.delete('/api/category/' + $routeParams.id)
    .then(function(response) {
        $window.location.href = '#/';
    });
}])

.controller('chapterEdit', ['$routeParams', '$http', '$window', '$scope', 'injectCats', 'catCount', function($routeParams, $http, $window, $scope, injectCats, catCount) {
    var title = injectCats.title;
    var desc = injectCats.desc;
    var order = injectCats.order;
    var image = injectCats.image;
    var active = injectCats.active;
    var maxOrder = Number(catCount);
    $scope.categoryFields = [
        {
            key: 'title',
            type: 'input',
            defaultValue: title,
            templateOptions: {
                type: 'text',
                label: 'Title',
                required: true
            }
        }, {
            key: 'desc',
            type: 'textarea',
            defaultValue: desc,
            templateOptions: {
                label: 'Description',
                required: true
            }
        }, {
            key: 'order',
            type: 'input',
            defaultValue: order,
            templateOptions: {
                label: 'Order',
                type: 'number',
                min: '1',
                max: maxOrder,
                required: true
            }
        }, {
            key: 'image',
            type: 'input',
            defaultValue: image,
            templateOptions: {
                type: 'text',
                label: 'Image',
                placeholder: 'Image url...',
                required: false
            }
        }, {
            key: 'active',
            type: 'checkbox',
            defaultValue: active,
            templateOptions: {
                label: 'Active'
            }
        }    
    ];
    $scope.originalFields = angular.copy($scope.categoryFields);
    $scope.onSubmit = function() {
        $http.put('/api/category/' + $routeParams.id, $scope.category)
        .success(function(data) {
            $window.location.href = '#/';
        })
        .error(function() {});
    };
}]);