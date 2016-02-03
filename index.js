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
//var Models = require('../models/models');

app.get('/', function(request, response) {
  response.render('pages/home.html');
  //response.render('pages/login.html');
});

app.get('/main', function(request, response) {
	response.render('pages/home.html');
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

app.get('/login', function(request, response) {
	response.render('pages/login.html');
});

app.post('/login', function(request, response) {

});

app.get('/signup', function(request, response) {
	response.render('pages/signup.html');
});

app.post('/signup', function(request, response) {
	//verify all the required fields have been given
	//if(request.body.api && request.body.source && request.body.title) {
		// var newPost = new User({
		// 	name: { 
		// 		first: request.body.first,
		// 		last: request.body.last
		// 	},
		// 	email: request.body.email,
		// 	password: request.body.password,
		// 	location: { street: request.body.street, city: request.body.city, cc: request.body.cc },
		// 	newcomer: request.body.newcomer
		// });
	 	
	 // 	newUser.save(function(error) {
	 // 		if(error) {
	 // 			throw error;
	 // 		} else {
	 // 			response.json(200, newUser);
	 // 		}
	 // 	});
 	//}
});

app.get('/home', function(request, response) {
	response.render('pages/home.html');
});

app.get('/learn', function(request, response) {
	response.render('pages/learn.html');
});

app.post('/learn', function(request, response) {

});

app.get('/teach', function(request, response) {
	response.render('pages/teach.html');
});

app.post('/teach', function(request, response) {

});

app.get('/classes', function(request, response) {
	response.render('pages/class_description.html');
	// var classes = [];
	// var query = request.query.query;
 // 	Class.find(query, function(error, classes) {
 // 		if(error) {
 // 			throw error;
 // 		} else {
 // 			response.json(200, classes);
 // 		}
 // 	});
});

// app.post('/classes')

app.get('/profile', function(request, response) {
	response.render('pages/profile.html');
});

// app.post('/profile', function(request, response) {

// });

// app.post('/posts/remove', function(request, response) {
// 	if(request.body._id) { //verify id has been sent
// 	 	Post.remove( { _id: request.body._id }, function(error) {
// 	 		if(error) {
// 	 			throw error;
// 	 		} else {
// 	 			response.send(200, "");
// 	 		}
// 	 	});
//  	}
// });

// app.post('/posts/upvote', function(request, response) {
// 	if(request.body._id) { //verify id has been sent
// 		console.log(request.body._id);
// 	 	Post.find({ _id : request.body._id }, function(error, person) {
// 	 		if(error) {
// 	 			throw error;
// 	 		} else if(person.length === 0) {
// 	 			throw new Exception('cant find person');
// 	 		} else {
// 	 			//get the first person from the list and update their upvates and save
// 	 			person[0].upvotes += 1;
// 	 			person[0].save(function(error) {
// 	 				if(error) {
// 	 					throw error;
// 	 				} else {
// 	 					response.json(200, person[0]);
// 	 				}
// 	 			});
// 	 		}
// 	 	});
//  	}
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

