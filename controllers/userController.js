var express = require('express'),
    router = express.Router();

var User = require('../models/user_model.js');

var path = require('path');


// SHOW USER REGISTRATION PAGE
router.get('/register', function(req, res) {
	res.sendFile(path.resolve(__dirname + '/../public/user_register.html'));

});
// end user registration


// CREATES THE USER
router.post('/register', function(req, res) {
        User.create(req.body, function(err, data){        
            res.redirect("/")
    })
})


// LOGIN ROUTE
router.get('/:id', function(req, res) {
	var userID = req.params.id;
	User.findOne({ "username" : userID }, function(err, user) {
		res.send(user);
		console.log(user);
	});

});
// end login route

module.exports = router;