/*global angular*/
angular.module('employeeHandbook', ['ngRoute', 'ngResource', 'formly', 'formlyBootstrap', 'controllers', 'services', 'directives', 'ngAnimate'])

// routes 
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { 
    $routeProvider 

    .when('/', { 
        templateUrl: '/home', 
        controller: 'controller4' 
    })
    
    .when('/chapter/new', {
        templateUrl: '/chapter/new',
        controller: 'chapterNew',
        resolve: {
            catCount: function(CategoryCount) {
                return CategoryCount.getCount().then(function(response) {
                    return response.data;
                });
            }
        }
    })
    
    .when('/chapter/:id/edit', {
        templateUrl: '/chapter/edit',
        controller: 'chapterEdit',
        resolve: {
            injectCats: function($route, getCats) {
                return getCats.getCategories($route.current.params.id).then(function(response) {
                    return response.data;
                });
            },
            catCount: function(CategoryCount) {
                return CategoryCount.getCount().then(function(response) {
                    return response.data;
                });
            }
        }
    })
    
    .when('/chapter/:id/delete', {
        templateUrl: '/test',
        controller: 'chapterDelete'
    })
    
    .when('/chapter/:id', {
        templateUrl: '/chapter',
        controller: 'chapterDetail'
    })
    
    .when('/about', {
        templateUrl: '/about',
        controller: 'controller2'
    })
    
    .when('/test', {
        templateUrl: '/test',
        controller: 'controller3'
    })
    
    .when('/section/new', {
        templateUrl: '/section/new',
        controller: 'sectionNew',
        resolve: {
            secCount: function($route, secCount) {
                return secCount.getCount($route.current.params.catid).then(function(response) {
                    return response.data;
                });
            },
            catInfo: function($route, getCats) {
                return getCats.getCategories($route.current.params.catid).then(function(response) {
                    return response.data; 
                });
            }
        }
    })
    
    .when('/section/:id/edit', {
        templateUrl: '/section/edit',
        controller: 'sectionEdit',
        resolve: {
            secCount: function($route, secCount) {
                return secCount.getCount($route.current.params.catid).then(function(response) {
                    return response.data;
                });
            },
            getSection: function($route, getSect) {
                return getSect.getSection($route.current.params.id).then(function(response) {
                    return response.data; 
                });
            }
        }
    })
    
    .when('/section/:id/delete', {
        templateUrl: '/test',
        controller: 'sectionDelete'
    })
    
    .when('/section/:id', {
        templateUrl: '/section',
        controller: 'sectionDetail'
    })
    
    .when('/procedure/:id/edit', {
        templateUrl: '/procedure/edit',
        controller: 'procedureEdit',
        resolve: {
            procCount: function($route, procCount) {
                return procCount.getCount($route.current.params.secid).then(function(response) {
                    return response.data;
                });
            },
            getProc: function($route, getProc) {
                return getProc.getProcedure($route.current.params.id).then(function(response) {
                    return response.data;
                });
            }
        }
    })
    
    .when('/procedure/new', {
        templateUrl: '/procedure/new',
        controller: 'procedureNew',
        resolve: {
            procCount: function($route, procCount) {
                return procCount.getCount($route.current.params.secid).then(function(response) {
                    return response.data;
                });
            },
            secInfo: function($route, getSect) {
                return getSect.getSection($route.current.params.secid).then(function(response) {
                    return response.data; 
                });
            }
        }
    })
    
    .when('/procedure/:id/delete', {
        templateUrl: '/procedure',
        controller: 'procedureDelete'
    })
    
    .when('/procedure/:id', {
        templateUrl: '/procedure',
        controller: 'procedureDetail',
        resolve: {
            versCount: function($route, versCount) {
                return versCount.getCount($route.current.params.id).then(function(response) {
                    return response.data; 
                });
            }
        }
    })
    
    .when('/version/list', {
        templateUrl: '/version/list',
        controller: 'versionList'
    })
    
    .when('/version/new', {
        templateUrl: '/version/new',
        controller: 'versionNew',
        resolve: {
            // the count of versions for this procedure, this is used to set the default version number
            versCount: function($route, versCount) {
                return versCount.getCount($route.current.params.proid).then(function(response) {
                    return response.data; 
                });
            },
            // retrieve the information about the procedure that this version belongs to
            getProc: function($route, getProc) {
                return getProc.getProcedure($route.current.params.proid).then(function(response) {
                    return response.data; 
                });
            }
        }
    })
    
    .when('/version/:id/edit', {
        templateUrl: '/version/edit',
        controller: 'versionEdit',
        resolve: {
            // we only need to get the version, we don't need the count of the versions (which sets the version number) as the number has already been assigned and cannot be changed (unlike the display order)
            getVers: function($route, getVers) {
                return getVers.getVersion($route.current.params.id).then(function(response) {
                    return response.data; 
                });
            }
        }
    })
    
    .otherwise({
        redirectTo: '/'
    }); 
    
}]); 
