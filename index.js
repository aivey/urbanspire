var http = require('http');
var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.engine('.html', ejs.renderFile);

// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.cookieParser());
// app.use(app.router);

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

app.get('/', function(request, response) {
  response.render('pages/main.html');
});

app.get('/main', function(request, response) {
	response.render('pages/main.html');
});

app.get('/main_teach', function(request, response) {
	response.render('pages/main_teach.html');
});

app.get('/urbanspire_learn', function(request, response) {
	response.render('pages/urbanspire_learn.html');
});

app.get('/urbanspire_teach', function(request, response) {
	response.render('pages/urbanspire_teach.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


