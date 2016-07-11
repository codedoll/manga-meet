var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	password: String,
	username: String
});

module.exports= mongoose.model('User', userSchema);