/*global angular*/
angular.module('controllers')

.controller('procedureDetail', ['$scope', '$routeParams', '$resource', '$http', 'versCount', function($scope, $routeParams, $resource, $http, versCount) {
    $scope.verscount = Number(versCount);
    $http.get('/api/procedure/' + $routeParams.id)
    .then(function(response) {
        $scope.procedure = response.data;
        $scope.convertToDate = function (stringDate){
            var dateOut = new Date(stringDate);
            dateOut.setDate(dateOut.getDate() + 1);
            return dateOut;
        };
    });
}])

.controller('procedureDelete', ['$routeParams', '$http', '$window', function($routeParams, $http, $window) {
    $http.delete('api/procedure/' + $routeParams.id)
    .then(function(response) {
        $window.location.href = '#/section/' + $routeParams.secid; 
    });
}])

.controller('procedureEdit', ['$routeParams', '$http', '$window', '$scope', 'procCount', 'getProc', function($routeParams, $http, $window, $scope, procCount, getProc) {
    var maxOrder = Number(procCount);
    var title = getProc.title;
    var desc = getProc.desc;
    var order = getProc.order;
    var active = getProc.active;
    $scope.procedureFields = [
        {
            key: 'sectionId',
            type: 'input',
            defaultValue: $routeParams.secid,
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
                placeholder: 'Procedure title...',
                required: true
            }
        }, {
            key: 'desc',
            type: 'textarea',
            defaultValue: desc,
            templateOptions: {
                label: 'Description',
                placeholder: 'Procedure description...',
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
            key: 'active',
            type: 'checkbox',
            defaultValue: active,
            templateOptions: {
                label: 'Active'
            }
        }
    ];
    $scope.originalFields = angular.copy($scope.procedureFields);
    $scope.onSubmit = function() {
        $http.put('/api/procedure/' + $routeParams.id, $scope.procedure)
        .success(function(data) {
            $window.location.href = '#/section/' + $routeParams.secid;
        })
        .error(function() {});
    };
}])

.controller('procedureNew', ['$scope', '$http', '$window', '$routeParams', 'procCount', 'secInfo', function($scope, $http, $window, $routeParams, procCount, secInfo) {
    $scope.procedureCount = procCount;
    $scope.sectionTitle = secInfo.title;
    var maxOrder = Number(procCount) + 1;
    $scope.procedure = {};
    $scope.procedureFields = [
        {
            key: 'sectionId',
            type: 'input',
            defaultValue: $routeParams.secid,
            templateOptions: {
                type: 'hidden'   
            }
        }, {
            key: 'title',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Title',
                placeholder: 'Procedure title...',
                required: true
            }
        }, {
            key: 'desc',
            type: 'textarea',
            templateOptions: {
                label: 'Description',
                placeholder: 'Procedure description...',
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
            key: 'active',
            type: 'checkbox',
            defaultValue: true,
            templateOptions: {
                label: 'Active'
            }
        }  
    ];
    $scope.onSubmit = function() {
        $http.post('/api/procedure', $scope.procedure)
        .success(function(data) {
            $window.location.href = '#/section/' + $routeParams.secid;
        })
        .error(function() {});
    };
}]);