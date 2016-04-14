/*global angular*/
(function() {
angular.module('directives', [])

.directive('ehInstructionForm', function() {
    return {
        // restrict = what can call it: (A)ttribute, (E)lement, (C)lass, co(M)ment -> defaults to AE
        restrict: 'AE',
        templateUrl: '/instruction/instructionform',
        // replace = replace the html element used to call the directive
        replace: true,
        // isolated scope
        // '@' = text, '=' = two way binding, '<' = one way binding, '&' = expression/calculation
        scope: {
            // example personName: '@' as person-name on html
            // or personNameSpecial: '@personName' to alias the calling element/attribute
            
        }
    };
})

// file uploade directive borrowed from http://www.cheynewallace.com/uploading-to-s3-with-angularjs/
.directive('file', function() {
    return {
        restrice: 'AE',
        scope: {
            file: '@'
        },
        link: function(scope, element, attrs) {
            element.bind('change', function(event) {
                var files = event.target.files;
                var file = files[0];
                scope.file = file;
                scope.$parent.file = file;
                scope.$apply();
            });
        }
    };
});

})();