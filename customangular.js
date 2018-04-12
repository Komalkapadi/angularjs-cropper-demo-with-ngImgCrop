/* 
 * Author: Komal Kapadi
 * Date  : 15th Dec 2017
 * Custom angular file 
 */
/* JavaScript Document */
app = angular.module('sixcloudAdminApp', ['ngRoute', 'angular-page-loader', 'ui.bootstrap', 'pascalprecht.translate', 'ngImgCrop']);
/*Check if user logout it redirect the login page.*/
function checklogin(param) {
    if (param.hasOwnProperty('logout')) {
        window.location = 'login';
    } else {
        return true;
    }
}
/* To change the interolate provider need to change it's originonal brackets.*/
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);
/* for changing title */
app.run(['$location', '$rootScope', '$http', '$timeout', function($location, $rootScope, $http, $timeout) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        if (current.$$route != undefined) $rootScope.pagetitle = current.$$route.title;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
}]);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/manage/dashboard', {
        templateUrl: BASEURL + '/resources/views/admin/angular/elt/ELT-home.html',
        controller: 'HomeController',
        title: 'Six Cloud Control Panel :: Dashboard',
        resolve: {
            Geteltsections: function(eltfactory) {
                return eltfactory.Geteltsections();
            }
        }
    }).when('/manage/subscription-plans', {
        templateUrl: BASEURL + '/resources/views/admin/angular/elt/ELT-subscription-plan.html',
        controller: 'SubscriptionController',
        title: 'Six Cloud Control Panel :: Subscription plans',
        resolve: {
            Getsubscriptions: function(subscriptionfactory) {
                return subscriptionfactory.Getsubscriptions();
            }
        }
    }).when('/manage/elt', {
        templateUrl: BASEURL + '/resources/views/admin/angular/elt/ELT-home.html',
        controller: 'HomeController',
        title: 'Six Cloud Control Panel :: Home',
        resolve: {
            Geteltsections: function(eltfactory) {
                return eltfactory.Geteltsections();
            }
        }
    }).when('/manage/transactions', {
        templateUrl: BASEURL + '/resources/views/admin/angular/elt/ELT-all-transactions.html',
        controller: 'TransactionController',
        title: 'Six Cloud Control Panel :: Transactions',
        resolve: {
            Getsubscriptions: function(subscriptionfactory) {
                return subscriptionfactory.Getsubscriptions();
            }
        }
    }).when('/manage', {
        templateUrl: BASEURL + '/resources/views/admin/angular/elt/home.html',
        controller: 'HomeController',
        title: 'Six Cloud Control Panel:: Home'
    }).when('/manage/open-cases', {
        templateUrl: BASEURL + '/resources/views/admin/angular/pr/PR-home.html',
        controller: 'PrOpenCaseController',
        title: 'Six Cloud Control Panel:: Open Cases'
    }).when('/manage/special-cases', {
        templateUrl: BASEURL + '/resources/views/admin/angular/pr/PR-special-cases.html',
        controller: 'PrSpecialCaseController',
        title: 'Six Cloud Control Panel:: Special Cases'
    }).when('/manage/closed-cases', {
        templateUrl: BASEURL + '/resources/views/admin/angular/pr/PR-close-cases.html',
        controller: 'PrClosedCaseController',
        title: 'Six Cloud Control Panel:: Closed Cases'
    }).when('/manage/all-accessor', {
        templateUrl: BASEURL + '/resources/views/admin/angular/pr/PR-all-accessors.html',
        controller: 'PrAllAccessorController',
        title: 'Six Cloud Control Panel:: All Accessors'
    }).when('/manage/account-info/:id', {
        templateUrl: BASEURL + '/resources/views/admin/angular/pr/PR-account-info.html',
        controller: 'PrAccountInfoController',
        title: 'Six Cloud Control Panel:: Account Info'
    }).when('/manage/accessors-my-account', {
        templateUrl: BASEURL + '/resources/views/admin/angular/pr/pr-accessor-my-account.html',
        controller: 'PrAccessorMyAccountController',
        title: 'Six Cloud Control Panel:: My Account'
    }).when('/manage/my-jobs', {
        templateUrl: BASEURL + '/resources/views/admin/angular/pr/pr-accessor-my-jobs.html',
        controller: 'PrAccessorMyJobsController',
        title: 'Six Cloud Control Panel:: My Jobs'
    }).when('/manage/my-account', {
        templateUrl: BASEURL + '/resources/views/admin/angular/my-acc/my-account.html',
        controller: 'MyAccountController',
        title: 'Six Cloud Control Panel:: My account'
    }).when('/manage/admin-team', {
        templateUrl: BASEURL + '/resources/views/admin/angular/my-acc/admin-team.html',
        controller: 'AddAdminController',
        title: 'Six Cloud Control Panel:: Add Admin',
        resolve: {
            Adminlisting: function(adminfactory) {
                return adminfactory.Adminlisting();
            }
        }
    }).otherwise({
        redirectTo: '/manage/elt'
    });
    $locationProvider.html5Mode(true);
}]);
/*CONFIG*/
app.run(function($rootScope, $location, $route, $timeout) {
    $rootScope.layout = {};
    $rootScope.$on('$routeChangeStart', function() {
        $timeout(function() {
            $rootScope.layout.loading = true;
        });
    });
    $rootScope.$on('$routeChangeSuccess', function() {
        $timeout(function() {
            $rootScope.layout.loading = false;
        }, 200);
    });
    $rootScope.$on('$routeChangeError', function() {
        $rootScope.layout.loading = false;
    });
});
//app.config(function ($httpProvider) {
//    console.log($httpProvider.responseInterceptors);
//    $httpProvider.responseInterceptors.push('myHttpInterceptor');
//    var spinnerFunction = function spinnerFunction(data, headersGetter) {
//        return data;
//    };
//    $httpProvider.defaults.transformRequest.push(spinnerFunction);
//});
app.factory('myHttpInterceptor', function($q, $window) {
    return function(promise) {
        return promise.then(function(response) {
            s
            /* checklogin(response.data);*/
            return response;
        }, function(response) {
            return $q.reject(response);
        });
    };
});
app.directive('scrollTrigger', function($window) {
    return {
        link: function(scope, element, attrs) {
            var offset = parseInt(attrs.threshold) || 0;
            var e = jQuery(element[0]);
            var doc = jQuery(document);
            angular.element(document).bind('scroll', function() {
                if (doc.scrollTop() + $window.innerHeight + offset > e.offset().top) {
                    scope.$apply(attrs.scrollTrigger);
                }
            });
        }
    };
});
app.directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function(scope) {
            scope.initCarousel = function(element) {
                s
                /* provide any default options you want */
                var defaultOptions = {};
                var customOptions = scope.$eval($(element).attr('data-options'));
                /*combine the two options objects*/
                for (var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                /*init carousel*/
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
})
app.directive('owlCarouselItem', [function() {
    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
            /*wait for the last item in the ng-repeat then call init*/
            if (scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}]);
// app.directive('validFile', function() {
//     return {
//         require: 'ngModel',
//         link: function(scope, el, attrs, ngModel) {
//             /*change event is fired when file is selected*/
//             el.bind('change', function() {
//                 scope.$apply(function() {
//                     ngModel.$setViewValue(el.val());
//                     ngModel.$render();
//                 });
//             });
//         }
//     }
// });
app.directive('validFile', function() {
    return {
        require: 'ngModel',
        link: function(scope, el, attrs, ctrl) {
            ctrl.$setValidity('validFile', el.val() != '');
            //change event is fired when file is selected
            el.bind('change', function() {
                ctrl.$setValidity('validFile', el.val() != '');
                scope.$apply(function() {
                    ctrl.$setViewValue(el.val());
                    ctrl.$render();
                });
            });
        }
    }
});
/* Disable console.log if mode is production.*/
if (project_mode == 'production') console.log = function() {}