// require('dotenv').config();

var nani = require('nani').init("codedoll-nzqbx", "cf3rXs48cV6nUshNYrUB9zZH3u");

//Calling dependencies
var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
   	shuffle = require('shuffle-array'),
    path = require('path');

var Manga = require('./models/manga_model.js');



app.use(session({
  cookieName: 'session',
  secret: 'beagle',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

var mangaController = require('./controllers/mangaController');
var userController = require('./controllers/userController');


app.use('/manga', mangaController);
app.use('/user', userController);

// SHOW ADMIN PAGE
app.get('/admin', function(req, res) {
  if(req.session.username == "Lyn" || req.session.username == "Joise") {
      res.sendFile(path.resolve(__dirname + '/public/admin.html'));
  }
  else {
    res.redirect('/')
  }

});
// end admin page

app.post('/search', function(req, res) {
  console.log(req.body.data);
  console.log('at search');
    nani.get('manga/search/'+req.body.data)
        .then(data => {
            console.log(data);
            res.send(data)
        })
        .catch(error => {
            console.log(error);
        });
});



// MANGA GET ROUTE to INDEX.HTML
app.get('/manga', function(req, res) {
	Manga.find(function(err, manga) {
		shuffle(manga)
		res.send(manga);
		// console.log(manga);
	});
});
// end manga route


app.get('*', function(req, res){
  res.redirect('/');
});

//Database name is mange_meet

var port = process.env.PORT || 3000
var MONGODBURI = process.env.MONGODB_URI || 'mongodb://localhost/manga_meet'
mongoose.connect(MONGODBURI);

app.listen(port);
