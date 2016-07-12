var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mangaSchema = new Schema({
	"type": String,
        "title_japanese": String,
        "title_english": String,
        "description": String,
        "genres": [],
        "image_url_lge": String,
        "image_url_med": String,
        "publishing_status": String,
        "total_volumes": Number,
        "adult": Boolean
});


var Manga = mongoose.model('Manga', mangaSchema);

module.exports  = Manga;