var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	password: String,
	username: String
});

module.exports= mongoose.model('User', userSchema);