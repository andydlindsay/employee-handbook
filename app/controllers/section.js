/*global angular*/
angular.module('controllers')

.controller('sectionDetail', ['$scope', '$routeParams', '$resource', '$http', function($scope, $routeParams, $resource, $http) {
    $http.get('/api/section/' + $routeParams.id)
    .then(function(response) {
        $scope.section = response.data; 
    });
}])

.controller('sectionDelete', ['$routeParams', '$http', '$window', function($routeParams, $http, $window) {
    $http.delete('/api/section/' + $routeParams.id)
    .then(function(response) {
       $window.location.href = '#/chapter/' + $routeParams.catid;
    });
}])

.controller('sectionEdit', ['$routeParams', '$http', '$window', '$scope', 'secCount', 'getSection', function($routeParams, $http, $window, $scope, secCount, getSection) {
    var maxOrder = Number(secCount);
    var title = getSection.title;
    var desc = getSection.desc;
    var order = getSection.order;
    var image = getSection.image;
    var active = getSection.active;
    $scope.sectionFields = [
        {
            key: 'categoryId',
            type: 'input',
            defaultValue: $routeParams.catid,
            templateOptions: {
                type: 'hidden'   
            }
        },
        {
            key: 'title',
            type: 'input',
            defaultValue: title,
            templateOptions: {
                type: 'text',
                label: 'Title',
                placeholder: 'Section title...',
                required: true
            }
        }, {
            key: 'desc',
            type: 'textarea',
            defaultValue: desc,
            templateOptions: {
                label: 'Description',
                placeholder: 'Section description...',
                required: false
            }
        }, {
            key: 'order',
            type: 'input',
            defaultValue: order,
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
    $scope.originalFields = angular.copy($scope.sectionFields);
    $scope.onSubmit = function() {
        $http.put('/api/section/' + $routeParams.id, $scope.section)
        .success(function(data) {
            $window.location.href = '#/chapter/' + $routeParams.catid;
        })
        .error(function() {});
    };
}])

.controller('sectionNew', ['$scope', '$http', '$window', '$routeParams', 'secCount', 'catInfo', function($scope, $http, $window, $routeParams, secCount, catInfo) {
    $scope.sectioncount = secCount;
    $scope.categoryTitle = catInfo.title;
    var maxOrder = Number(secCount) + 1;
    $scope.section = {};
    $scope.sectionFields = [
        {
            key: 'categoryId',
            type: 'input',
            defaultValue: $routeParams.catid,
            templateOptions: {
                type: 'hidden'   
            }
        },
        {
            key: 'title',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Title',
                placeholder: 'Section title...',
                required: true
            }
        }, {
            key: 'desc',
            type: 'textarea',
            templateOptions: {
                label: 'Description',
                placeholder: 'Section description...',
                required: false
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
        $http.post('/api/section', $scope.section)
        .success(function(data) {
            $window.location.href = '#/chapter/' + $routeParams.catid;
        })
        .error(function() {});
    };
}]);