angular.module('nibs_ibeacon.productcat', ['openfb', 'nibs_ibeacon.status', 'nibs_ibeacon.activity', 'nibs_ibeacon.wishlist'])

    .config(function ($stateProvider) {

        $stateProvider

            .state('app.productscat', {
                url: "/productscat",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/productcat.html",
                        controller: "ProductCatCtrl"
                    }
                }
            })

            .state('app.productcatList', {
                url: "/productscat/:productId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/product-list.html",
                        controller: "ProductListCtrl"
                    }
                }
            })

    })

    // REST resource for access to Products data
    .factory('Product', function ($http, $rootScope) {
        return {
            all: function() {
                return $http.get($rootScope.server.url + '/productscat');
            },
            get: function(productId) {
              console.log("this is product: ",productId);
                return $http.get($rootScope.server.url + '/productscat/52');
            }
        };
    })

    .controller('ProductCatCtrl', function ($scope, Product, OpenFB) {

        Product.all().success(function(products) {
            $scope.products = products;
        });

        $scope.doRefresh = function() {
            Product.all().success(function(products) {
                $scope.products = products;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

    })

    .controller('ProductListCtrl', function ($scope, $rootScope, $stateParams, $ionicPopup, Product, OpenFB, WishListItem, Activity, Status) {
        Product.get(product.id).success(function() {
              $scope.product = product;
        });

        /**
        Original One

            Product.get($stateParams.productId).success(function(product) {
            $scope.product = product;
        });**/

        /**
          One to try out
        $scope.getItem = function(product) {
          Status.show('Getting Items');
          Product.get(product.id).success(function() {
                $scope.product = product;
          });
        };
        **/

        $scope.shareOnFacebook = function () {
            Status.show('Shared on Facebook!');
            Activity.create({type: "Shared on Facebook", points: 1000, productId: $scope.product.sfid, name: $scope.product.name, image: $scope.product.image})
                .success(function(status) {
                    Status.checkStatus(status);
                });
        };

        $scope.shareOnTwitter = function () {
            Status.show('Shared on Twitter!');
            Activity.create({type: "Shared on Twitter", points: 1000, productId: $scope.product.sfid, name: $scope.product.name, image: $scope.product.image})
                .success(function(status) {
                    Status.checkStatus(status);
                });
        };

        $scope.shareOnGoogle = function () {
            Status.show('Shared on Google+!');
            Activity.create({type: "Shared on Google+", points: 1000, productId: $scope.product.sfid, name: $scope.product.name, image: $scope.product.image})
                .success(function(status) {
                    Status.checkStatus(status);
                });
        };

        $scope.saveToWishList = function () {
            WishListItem.create({productId: $scope.product.id}).success(function(status) {
                Status.show('Added to your wish list!');
                Activity.create({type: "Added to Wish List", points: 1000, productId: $scope.product.sfid, name: $scope.product.name, image: $scope.product.image})
                    .success(function(status) {
                        Status.checkStatus(status);
                    });
            });
        };

    });
