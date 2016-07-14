var app = angular.module('MangaMeet', ['ngRoute', 'ngAnimate']);

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
            $route.reload();

            self.usernameLogged = response.data.sessionID;

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
                    "mangaID": manga.mangaID
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
            // self.reloadView();
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


    this.returnManga = function(mangaID) {
        console.log('clicked return');
        // console.log(mangaID);
        $http({
            method: 'PUT',
            url: '/user/returnmanga',
            data: {
                "mangaID": mangaID,
            }
        }).then(function(result) {
            self.rentedManga();
            self.getManga();

            console.log(result.data);
        });
    }


    //claim a manga on button click
    this.claim = function(manga) {
        // console.log(manga);
        // console.log($scope.$parent.ctrl.usernameLogged);
        console.log('CLAIMED');
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
        })

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

    this.sayHello = function () {
        self.reloadView();
        alert("Hi")
    };


}]); // end MangaIndexController


app.controller('AdminController', ['$http', '$scope', '$rootScope', '$routeParams', '$route', '$q', function($http, $scope, $rootScope, $routeParams, $route, $q) {
    
    var self = this;

    this.fromNani = function(data){
        console.log(data);
            $scope.dataLoaded = false;
            $http({
            method:'POST',
            url: 'http://localhost:3000/search/',
            data: {data:data}
        }).then(function(response){
                            $scope.dataLoaded = true;

            self.data = response.data;
            console.log(response);
        },function(response){
            //fail callback
            console.log('fail');
        })
    }
    


}]); // end AdminController
