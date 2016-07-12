var app = angular.module('MangaMeet', ['ngRoute']);

console.log('app.js loaded');

app.controller('MainController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	var self = this;
	


	// login function
	// the function for submit button on login form gets the user data from DB
	this.loginForm = function(loginform) {
		
		console.log(loginform.username);

		$http({
			url: '/user/' + loginform.username,
			method: 'GET'
		}).then(function(response) {
			console.log(response.data);
		});

	};


}]); // end MainController


app.controller('MangaIndexController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	var self = this;

	// get Manga to display on index
	this.getManga = function() {
		console.log('getManga');
		$http({
			url: '/manga',
			method: 'GET'
		}).then(function(response) {
			console.log(response.data);
			self.mangaCover = response.data
			// self.mangaCover = response.data[0].title_english;
		})
	};
	// end get Manga

	this.getManga();


}]); // end MangaIndexController