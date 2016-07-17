var mongoose = require('mongoose');

var userMangaSchema = mongoose.Schema({
	"username" : String,
	"mangaID" : String,
	"title_english" : String,
	"description" : String,
	"genres" : [],
	"image_url_med" : String,
	"image_url_lge": String,
	"publishing_status": String,
	"total_volumes" : Number,
	"usernameRenting" : String,
	"rentedOut" : Boolean,
	"date_borowed" : String,
	"date_due" : String,
	"date_returned" : String
}, { strict : true });

module.exports= mongoose.model('UserManga', userMangaSchema);



        // "type": String,
        // "title_japanese": String,
        // "title_english": String,
        // "description": String,
        // "genres": [],
        // "image_url_lge": String,
        // "image_url_med": String,
        // "publishing_status": String,
        // "total_volumes": Number,
        // "adult": Boolean