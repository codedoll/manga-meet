var app = angular.module('MangaMeet', ['ngRoute']);

console.log('app.js loaded');

app.controller('MainController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	this.loginForm = function(loginform) {
		
		console.log(loginform.username);

	$http({
		url: '/user/' + loginform.username,
		method: 'GET'
	}).then(function(response) {
		console.log(response.data);
		// self.user = response.data;

		// self.formdata.name = response.data.name,
		// self.formdata.age = response.data.age,
		// self.formdata.img = response.data.img,
		// self.formdata.gender = response.data.gender

	});

	};


}]); // end MainController
