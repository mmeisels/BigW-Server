angular.module('nibs_ibeacon.oauthcallback', [])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.oauthcallback', {
                url: "/oauthcallback",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/oauthcallback.html",
                        controller: "oauthcallbackCtrl"
                    }
                }
            })

    })
    // Controllers
    .controller('oauthcallbackCtrl', function () {

    });
