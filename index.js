var http = require('http');
var express = require('express');
var ejs = require('ejs');
var app = express();
var connect = require('connect');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.engine('.html', ejs.renderFile);

//var MemoryStore = require('connect/middleware/session/memory');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }));
//app.use(express.bodyDecoder());
//app.use(express.cookieDecoder());
//app.use(express.cookieParser());
//app.use(express.session({ store: new MemoryStore({ reapInterval: 60000 * 10 }) }));

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/HelloMongoose';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('Error connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

require('./routes/routes.js')(app);


// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.cookieParser());
// app.use(app.router);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


