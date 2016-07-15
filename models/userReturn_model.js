var mongoose = require('mongoose');

var userReturnSchema = mongoose.Schema({
	"username" : String,
	"mangaID" : String,
	"title_english" : String,
	"image_url_med" : String,
	"total_volumes" : Number,
	"usernameRenting" : String,
	"rentedOut" : Boolean,
	"date_borowed" : String,
	"date_due" : String,
	"date_returned" : String
}, { strict : true });

module.exports= mongoose.model('UserReturn', userReturnSchema);