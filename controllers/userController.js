var express = require('express'),
    router = express.Router();

var User = require('../models/user_model.js');

// LOGIN ROUTE
router.get('/:id', function(req, res) {
	// console.log(req.params.id);
	User.findOne(req.params.id, function(err, user) {
		res.send(user);
	});

});
// end login route



module.exports = router;