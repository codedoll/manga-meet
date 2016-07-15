var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
	shuffle = require('shuffle-array');

var isNull = require('is-null');

var User = require('../models/user_model.js');
var UserManga = require('../models/userManga_model.js')
var UserReturn = require('../models/userReturn_model.js')
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
	});
});
// end


// GET MANGAS USER OWNS
router.get('/ownmanga', function(req, res) {
	UserManga.find({"username": req.session.username}, function(err, manga) {
		var data = manga;
		// shuffle(manga)
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


// RENT MANGA FROM OTHERS
router.put('/rent', function(req, res) {
    var mangaID = req.body.mangaID;

    // console.log(mangaID + " is " + typeof mangaID);
    UserManga.findOneAndUpdate({"mangaID": mangaID},{
        "usernameRenting": req.session.username,
         "date_borowed": req.body.date_borowed,
         "date_due": req.body.date_due
    }, function(err, user) {
        res.send(user);
        console.log(user);
    });
});
//

// RETURNING MANGAS
router.put('/returnmanga', function(req, res) {
    
    var newUserReturn = new UserReturn(req.body);
    newUserReturn.save();

    UserManga.findOneAndUpdate({"usernameRenting": req.session.username}, 
        {
            "usernameRenting": "",
            "date_borowed" : "",
             "date_due" : "",
           "date_returned" : ""
        } , function(err, user) {
        res.send(user);
     });
});
// mangas returned


//DELETE MANGA FROM USER
router.delete('/delete', function(req, res) {
    UserManga.findByIdAndRemove(req.body.manga._id, function(err, data){
    res.send(data)
  })
});
//

// LOGIN ROUTE
router.get('/:id', function(req, res) {
    var userID = req.params.id;
    User.findOne({ "username": userID }, function(err, user) {
        if (user == null) {
            console.log("no user found");
            res.send({ user: "INVALID" })
        } else {
            // sets a cookie with the user's info
            req.session.username = user.username;
            res.send({
                user: user,
                sessionID: req.session.username
            });

        }
    });

});

// end login route


module.exports = router;