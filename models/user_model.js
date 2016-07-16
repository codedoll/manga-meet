var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	username: String
});

module.exports= mongoose.model('User', userSchema);