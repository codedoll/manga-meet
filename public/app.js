var app = angular.module('MangaMeet', ['angularMoment','ngRoute', 'ngAnimate', 'mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'angularModalService']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });

    $routeProvider.when('/', {
        templateUrl: 'partial/home_page.html',
        controller: 'MangaController',
        controllerAs: 'mctrl'
    })
}])

// console.log('app.js loaded');
app.controller('MainController', ['$http', '$route', '$scope', '$routeParams', function($http, $route, $scope, $routeParams) {
    var self = this;

    var usernameLogged;

    // login function
    // the function for submit button on login form gets the user data from DB
    this.loginForm = function(loginform) {
        $http({
            url: '/user/' + loginform.username,
            method: 'GET'
        }).then(function(response) {
            console.log(response.data);
            if (response.data.user != "INVALID") {
                self.usernameLogged = response.data.sessionID;
                //flip partials to the user menu partials
            }

            $route.reload();

        })
    };


    this.sessionLog = function() {
        $http({
            url: '/user/sessionchecker',
            method: 'GET'
        }).then(function(response) {
            self.usernameLogged = response.data.userID;
        })
    };


    this.sessionLog();

    this.showData = function(data) {
        console.log(data);
    }


}]); // end MainController



app.controller('MangaController', ['$http', '$scope', '$routeParams', '$route', function($http, $scope, $routeParams, $route) {

    var self = this;

    // get Manga from other users to display on index
    this.getManga = function() {
        // console.log('getManga');
        $http({
            url: '/manga/forrent',
            method: 'GET',
            data: $scope.$parent.ctrl.usernameLogged,
        }).then(function(response) {
            // console.log(response)
            self.othersManga = response.data
        })
    };
    // end get Manga
    this.getManga();


    // get all Manga to display on index
    this.allManga = function() {
        // console.log('getManga');
        $http({
            url: '/manga',
            method: 'GET'
        }).then(function(response) {
            // console.log(response.data);
            self.mangaCover = response.data
        })
    };
    // end get Manga
    this.allManga();

    //




    //rents manga from the recommended mangas
    this.rentManga = function(manga) {
        // console.log(manga);
        // console.log($scope.$parent.ctrl.usernameLogged);
        $http({
                    method: 'PUT',
                    url: '/user/rent',
                    data: {
                        "mangaID": manga.mangaID,
                        "date_borowed": moment()._d,
                        "date_due": moment().add(10, 'days')._d
                    }

            })
            .then(function(result) {
                self.getManga();
                self.rentedManga();

            });
    };



    this.ownedManga = function() {
        $http({
            url: '/user/ownmanga',
            method: 'GET',
        }).then(function(response) {
            // console.log(response.data);
            self.owned = response.data;
        })

    };
    // end get owned Manga

    this.ownedManga();


    // FINDS RENTED MANGA IN DB
    this.rentedManga = function() {
        $http({
            url: '/user/rented',
            method: 'GET'
        }).then(function(response) {
            self.rentedOutManga = response.data;
            console.log(response.data);
        })
    };

    this.rentedManga();


    self.delete = function(manga) {
        console.log(manga._id);
        $http({
            method: 'DELETE',
            url: '/user/delete',
            data: {
                manga: manga
            },
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        })

        self.reloadView();
    }


    this.returnManga = function(returnedManga) {
        console.log('clicked return');
        console.log(returnedManga);
        $http({
            method: 'PUT',
            url: '/user/returnmanga',
            data: {
                "mangaID": returnedManga.mangaID,
                "date_returned" : moment(),
                "date_borowed": moment()._d,
                "date_due": moment().add(10, 'days')._d,
                "usernameRenting": $scope.$parent.ctrl.usernameLogged,
                "title_english": returnedManga.title_english,
                "image_url_med": returnedManga.image_url_med,
            }
        }).then(function(result) {
            self.rentedManga();
            self.getManga();

            // console.log(result.data);
        });
    }


    //claim a manga on button click
    this.claim = function(manga) {

        $http({
            method: 'POST',
            url: '/user/ownmanga',
            data: {
                "username": $scope.$parent.ctrl.usernameLogged,
                "mangaID": manga._id,
                "title_english": manga.title_english,
                "image_url_med": manga.image_url_med,
                "total_volumes": manga.total_volumes,
                "usernameRenting": "",
                "rentedOut": 0
            }
        }).then(function(result) {
            console.log(result);

        });

        // What we return here is the data that will be accessible 
        // to us after the promise resolves
        $route.reload();


    };

    this.reloadView = function() {
        console.log('reloadView');
        self.getManga();
        self.ownedManga();
        self.rentedManga();
    };

    this.sayHello = function() {
        self.reloadView();
        alert("Hi")
    };


}]); // end MangaIndexController


app.controller('AdminController', ['$http', '$scope', '$rootScope', '$routeParams', '$route', '$q', '$modal', 'ModalService', function($http, $scope, $rootScope, $routeParams, $route, $q, $modal, ModalService) {

    this.sayHello = function() {
        alert("HI")
    }

    var self = this;

    this.fromNani = function(data) {
        console.log(data);
        $scope.dataLoaded = false;
        $http({
            method: 'POST',
            url: '/search',
            data: { data: data }
        }).then(function(response) {
            $scope.dataLoaded = true;

            self.data = response.data;
            console.log(response);
        }, function(response) {
            //fail callback
            console.log('fail');
        })
    }

  //    $scope.modal = {title: 'Title', content: 'Hello Modal<br />This is a multiline message!'};
  $scope.showAModal = function() {

    // Just provide a template url, a controller and call 'showModal'.
    ModalService.showModal({
      templateUrl: "modal.htmll",
      controller: "YesNoController"
    }).then(function(modal) {
      // The modal object has the element built, if this is a bootstrap modal
      // you can call 'modal' to show it, if it's a custom modal just show or hide
      // it as you need to.
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.message = result ? "You said Yes" : "You said No";
      });
    });

  };



    // http://stackoverflow.com/questions/23490596/angularjs-loading-icon-whilst-waiting-for-data-data-calculation

}]); // end AdminController
