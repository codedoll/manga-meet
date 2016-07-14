var app = angular.module('MangaMeet', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({enabled: true}); 

    $routeProvider.when('/',{
        templateUrl: 'partial/home_page.html',
        controller: 'MangaController',
        controllerAs: 'mctrl'
    })
}])

// console.log('app.js loaded');
app.controller('MainController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

    var self = this;

    var usernameLogged;

    // login function
    // the function for submit button on login form gets the user data from DB
    this.loginForm = function(loginform) {

        // console.log(loginform.username);

        $http({
            url: '/user/' + loginform.username,
            method: 'GET'
        }).then(function(response) {
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

    //claim a manga on button click
    this.claim = function(manga) {
        // console.log(manga);
        // console.log($scope.$parent.ctrl.usernameLogged);
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
            // console.log(result.data);
        });
    };


    //rents manga from the mmended mangas
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
        // .then(function(result) {
        //     console.log(result.data);
        // });

        .then(function(result) {
            // console.log(result.data);
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
            self.reloadView();
        })
    };

    this.rentedManga();


    this.delete = function(manga) {
        // console.log(manga._id);
        $http({
            method: 'DELETE',
            url: '/user/delete',
            data: {
                manga: manga
            },
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then(function() {
            // window.location.pathname = "/";
        })
    }


    this.returnManga = function(mangaID) {
        // console.log('clicked return');
        // console.log(manga);
        $http({
            method: 'PUT',
            url: '/user/returnmanga',
            data: {
                "mangaID": mangaID,
            }
        }).then(function(result) {
            console.log(result.data);
        });
    }


    this.reloadView = function() {
        // self.getManga();
        self.ownedManga();
        self.rentedManga();
        // self.allManga();
    };


}]); // end MangaIndexController
