/*global angular*/
angular.module('controllers')

.controller('instructionFormController', ['$scope', '$http', '$route', '$window', function($scope, $http, $route, $window) {
    // generate instruction form with angular schema form
    $scope.instruction = {};
    $scope.instruction.versionId = $scope.versionId;
    
    $scope.instructionSchema = {
        type: "object",
        properties: {
            order: {
                type: 'integer',
                title: 'Order',
                minimum: 1,
                maximum: $scope.maxOrder,
                default: $scope.maxOrder
            },
            instruction: {
                type: 'string',
                title: 'Instruction',
                minLength: 25,
                "x-schema-form": {
                    type: 'textarea'
                }
            },
            image: {
                type: 'string',
                title: 'Image'
            },
            imageCaption: {
                type: 'string',
                title: 'Image Caption'
            }
        }
    };
    
    $scope.instructionForm = [
        '*',
        {
            type: "actions",
            items: [
                {
                    type: 'submit',
                    style: 'btn-primary',
                    title: 'Save'
                }  
            ]
        }
    ];
    
    $scope.instrSubmit = function() {
        $http.post('/api/instruction', $scope.instruction)
        .success(function(data) {
            $window.location.href = "#/instruction/list?versid=" + $scope.instruction.versionId + "#instrform";
            // $route.reload();
        })
        .error(function() {
            
        });
    };
    
}])

.controller('instructionList', ['$scope', '$http', '$routeParams', 'instrCount', function($scope, $http, $routeParams, instrCount) {
    // retrieve version information including instruction list in order
    $scope.maxOrder = Number(instrCount) + 1;
    $scope.versionId = $routeParams.versid;
    $http.get('/api/instructions/' + $routeParams.versid)
    .then(function(response) {
        $scope.version = response.data;
    });
}]);