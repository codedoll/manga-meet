var express = require('express'),
    router = express.Router();

var User = require('../models/user_model.js');

var path = require('path');


// SHOW USER REGISTRATION PAGE
router.get('/register', function(req, res) {
	res.sendFile(path.resolve(__dirname + '/../public/user_register.html'));

});

// CREATES THE USER
router.post('/register', function(req, res) {
        User.create(req.body, function(err, data){        
            res.send(data)
    })
})


module.exports = router;