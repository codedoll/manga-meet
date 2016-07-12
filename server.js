// require('dotenv').config();

//Calling dependencies
var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//Database name is mange_meet
mongoose.connect('mongodb://localhost/manga_meet');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

var mangaController = require('./controllers/mangaController');
var userController = require('./controllers/userController');

var Manga = require('./models/manga_model.js');


app.use('/manga', mangaController);
app.use('/user', userController);


// MANGA GET ROUTE to INDEX.HTML
app.get('/manga', function(req, res) {
	Manga.find(function(err, manga) {
		res.send(manga);
		console.log(manga);
	});
});
// end manga route


app.get('*', function(req, res){
  res.redirect('/');
});

app.listen(3000);
