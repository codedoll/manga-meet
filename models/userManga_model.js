var mongoose = require('mongoose');

var userMangaSchema = mongoose.Schema({
	"username" : String,
	"mangaID" : String,
	"manga_title" : String,
	"manga_cover" : String,
	"volumes" : String,
	"usernameRenting" : String,
	"rentedOut" : Boolean
}, { strict : true });

module.exports= mongoose.model('UserManga', userMangaSchema);