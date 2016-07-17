var app = angular.module('MangaMeet', ['angularMoment', 'ngRoute', 'ngAnimate', 'ngDialog', 'ngSanitize']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });

    $routeProvider.when('/', {
        templateUrl: 'partial/home_page.html',
        controller: 'MangaController',
        controllerAs: 'mctrl'
    })
}])

// console.log('app.js loaded');
app.controller('MainController', ['$http', '$route', '$scope', '$routeParams', 'ngDialog', function($http, $route, $scope, $routeParams, ngDialog) {
    var self = this;
    var usernameLogged = "GUEST";
    this.sayHello = function() {
        alert("saHello()")
    }

    //registration popup
    this.registerModal = function() {
            // $scope.manga = manga;

            ngDialog.open({
                template: '/partial/user_register_partial.html',
                // className: 'ngdialog-theme-plain',
                // controller: 'MangaController',
                scope: $scope
            });
        }
        //


    // login function
    // the function for submit button on login form gets the user data from DB
    this.loginForm = function(loginform) {
        console.log(loginform);
        $http({
            url: '/user/login',
            method: 'POST',
            data: loginform
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


    this.logout = function() {
        $http({
            url: '/logout',
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



app.controller('MangaController', ['$http', '$scope', '$routeParams', '$route', 'ngDialog', function($http, $scope, $routeParams, $route, ngDialog) {

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


    // MODAL for INDEX
    this.indexModal = function(manga) {

            // $scope.manga = manga;

            // ngDialog.open({
            //     template: 'modal.html',
            //     controller: 'AdminController',
            //     scope: $scope
            // });

            console.log(manga);
            console.log("Hi the manga is " + manga.title_english);

            // $scope.clickToOpen = function(manga) {
            $scope.manga = manga;

            ngDialog.open({
                template: '/partial/show_page.html',
                // className: 'ngdialog-theme-plain',
                controller: 'MangaController',
                scope: $scope
            });
            // };

        }
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
            // console.log(response.data);
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
                "date_returned": moment(),
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
        console.log(manga);
        $http({
            method: 'POST',
            url: '/user/ownmanga',
            data: {
                "username": $scope.$parent.ctrl.usernameLogged,
                "mangaID": manga._id,
                "title_english": manga.title_english,
                "description": manga.description,
                "genres": [manga.genres],
                "image_url_med": manga.image_url_med,
                "image_url_lge": manga.image_url_lge,
                "total_volumes": manga.total_volumes,
                "usernameRenting": "",
                "rentedOut": 0

                //             "username" : String,
                // "mangaID" : String,
                // "title_english" : String,
                // "description" : String,
                // "genres" : [],
                // "image_url_med" : String,
                // "image_url_lge": String,
                // "publishing_status": String,
                // "total_volumes" : Number,
                // "usernameRenting" : String,
                // "rentedOut" : Boolean,
                // "date_borowed" : String,
                // "date_due" : String,
                // "date_returned" : String
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


app.controller('AdminController', ['$http', '$scope', '$route', '$rootScope', '$routeParams', '$route', 'ngDialog',
    function($http, $scope, $route, $rootScope, $route, $routeParams, ngDialog) {
        $scope.dataLoaded = true;

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

        // This is what "ADD MANGA" button does from modal.html
        // Adds data to collection "mangas" . Make sure data passed is correct.
        // Look at manga_model for properties.

        this.addToMangaDB = function(data) {
            // console.log(data);
            // alert("from AdminController. clicked : " + data.title_english);
            $http({
                method: 'POST',
                url: '/manga/addmanga',
                data: data
            }).then(function(response) {
                console.log(response);
            }, function(response) {
                //fail callback
                console.log('fail');
            })

        }

        $scope.clickToOpen = function(manga) {
            console.log(manga);


            $http({
                method: 'GET',
                url: '/search/' + manga.id,
                data: manga
            }).then(function(response) {
                console.log(response.data);
                $scope.manga = response.data;
                ngDialog.open({
                    template: 'modal.html',
                    controller: 'AdminController',
                    scope: $scope
                });
            }, function(response) {
                //fail callback
                console.log('fail');
            })



        };

        // http://stackoverflow.com/questions/23490596/angularjs-loading-icon-whilst-waiting-for-data-data-calculation

    }
]); // end AdminController
