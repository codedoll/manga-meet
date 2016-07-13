var mongoose = require('mongoose');

var userMangaSchema = mongoose.Schema({
	"username" : String,
	"mangaID" : String,
	"title_english" : String,
	"image_url_med" : String,
	"total_volumes" : Number,
	"usernameRenting" : String,
	"rentedOut" : Boolean
}, { strict : true });

module.exports= mongoose.model('UserManga', userMangaSchema);