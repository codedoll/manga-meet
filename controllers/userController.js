var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
	shuffle = require('shuffle-array');

var User = require('../models/user_model.js');
var UserManga = require('../models/userManga_model.js')
var Manga = require('../models/manga_model.js');

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
// end create user


// REQ.SESSION.USERNAME CHECKER
router.get('/sessionchecker', function(req, res){
	res.send({userID: req.session.username})
});


// PUSH INTO DB MANGAS USER OWNS
router.post('/ownmanga', function(req, res) {
	UserManga.create(req.body, function(err, data) {
		res.send(data);
		console.log(data);
	});
});
// end


// GET MANGAS USER OWNS
router.get('/ownmanga', function(req, res) {
	UserManga.find({"username": req.session.username}, function(err, manga) {
		var data = manga;
		shuffle(manga)
		res.send(manga);
		// console.log(manga);
	});
});

// end get mangas user owns


// GET MANGAS USER RENTED FROM OTHERS
router.get('/rented', function(req, res) {
    var userRent = req.session.username;
    UserManga.find({"usernameRenting": userRent }, function(err, manga) {
        // shuffle(manga)
        res.send(manga);
    });
});

// end get mangas user owns


// RETURNING MANGAS
router.put('/returnmanga', function(req, res) {
    UserManga.findOneAndUpdate({"usernameRenting": req.body.usernameRenting}, {"usernameRenting": "NONE"} , { new: true }, function(err, user) {
        res.send(user);
    });
});
// mangas returned


//DELETE MANGA FROM USER
router.delete('/delete', function(req, res) {
    console.log(req.body.manga._id);
    UserManga.findByIdAndRemove(req.body.manga._id, function(err, data){
    res.send(data)
  })
});
//

// LOGIN ROUTE
router.get('/:id', function(req, res) {
    var userID = req.params.id;
    User.findOne({ "username": userID }, function(err, user) {
        // sets a cookie with the user's info
        req.session.username = user.username;
        res.send({
            user: user,
            sessionID: req.session.username
        });
    });

});
// end login route


module.exports = router;