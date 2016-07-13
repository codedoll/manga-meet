var app = angular.module('MangaMeet', ['ngRoute']);

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





app.controller('MangaIndexController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

    var self = this;

    // get Manga to display on index
    this.getManga = function() {
        // console.log('getManga');
        $http({
            url: '/manga',
            method: 'GET'
        }).then(function(response) {
            // console.log(response.data);
            self.mangaCover = response.data
                // self.mangaCover = response.data[0].title_english;
        })
    };
    // end get Manga

    this.ownManga = function(manga) {
        // console.log(manga);
        // console.log($scope.$parent.ctrl.usernameLogged);
        $http({
            method: 'POST',
            url: '/user/ownmanga',
            data: {
                "username": $scope.$parent.ctrl.usernameLogged,
                "mangaID": manga._id,
                "volumes": "1,2,3",
                "manga_title": manga.title_english,
                "manga_cover": manga.image_url_med,
                "usernameRenting" : "1",
                "rentedOut": 1
            }
        }).then(function(result) {
            console.log(result.data);
        });

    };

    this.getManga();




}]); // end MangaIndexController



app.controller('OwnedController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

    var self = this;
    // // get Mangas Owned to display on index
    this.ownedManga = function() {
        $http({
            url: '/user/ownmanga',
            method: 'GET',
        }).then(function(response) {
            // console.log(response.data);
            self.manga = response.data;
        })
    };
    // // end get Manga

    this.ownedManga();


        this.delete = function(manga) {
            console.log(manga._id);
            $http({
                method: 'DELETE',
                url: '/user/delete',
                data: {manga: manga}, 
                headers: {"Content-Type": "application/json;charset=utf-8"}
            //     data:  {
            //     manga: manga._id
            // }
            }).then(function() {
                // window.location.pathname = "/";
            })
        }
}]); // end MangaIndexController


app.controller('RentedController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
    var self = this;

    this.rentedManga = function() {
        $http({
            url: '/user/rented',
            method: 'GET'
        }).then(function(response) {
            self.manga = response.data
        })
    };

    this.rentedManga();


    this.returnManga = function(mangaID) {
        // console.log('clicked return');
        // console.log(manga);
        $http({
            method: 'PUT',
            url: '/user/returnmanga',
            data: {
                "mangaID" : mangaID,
                "usernameRenting" : $scope.$parent.ctrl.usernameLogged 
            }
        }).then(function(result) {
            console.log(result.data);
        });
    }



}]); // end RentedController
