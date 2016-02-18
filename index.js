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
var Models = require('./models/models');

app.get('/', function(request, response) {
  response.render('pages/home.html');
  //response.render('pages/login.html');
});

app.get('/home', function(request, response) {
	response.render('pages/home.html');
});

app.get('/login', function(request, response) {
	response.render('pages/login.html');
});

app.post('/login', function(request, response) {
	//verify all the required fields have been given
	if(request.body.email && request.body.password) {
		var user = User.find({
			email: request.body.email,
			password: request.body.password,
		}, function (error, user) {
			if(error) {
	 			throw error;
	 		} else {
	 			response.json(200, user);
	 		}
		});
 	}
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

app.get('/learn', function(request, response) {
	response.render('pages/learn.html');
	//response.render('pages/learn_african_cooking.html');
});

app.get('/african', function(request, response) {
	//response.render('pages/learn.html');
	response.render('pages/african.ejs');
});

app.get('/european', function(request, response) {
	//response.render('pages/learn.html');
	response.render('pages/european.ejs');
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

app.get('/review', function(request, response) {
	response.render('pages/make_review.html');
});

// app.post('/classes')

app.get('/class/upcomingClasses', function(request, response) {
	response.json([{ 
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            }]);
});

app.get('/class/upcomingTeachings', function(request, response) {
	response.json([{
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            }]);
});

app.get('/class/pastClasses', function(request, response) {
	response.json([{ 
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            }]);
});

app.get('/class/pastTeachings', function(request, response) {
	response.json([
            { 
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            },
            { 
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            }
          ]);
});

app.get('/class/search', function(request, response) {
	var classes = [];
	var params = request.query;

	var query = { };
 	Class.find(query, function(error, classes) {
 		if(error) {
 			throw error;
 		} else {
 			response.json(200, classes);
 		}
 	});
});

app.get('/class/recommendations', function(request, response) {
	response.json([{ 
      title: "Irish Dancing",
      photos: ["/images/irish_dance.png"],
      continent: "European",
      country: "Irish",
      type: "Dance",
      blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
      teacher: {
        image: "/images/Margaret.png",
        name: {
          first: "Margaret",
          last: "Markin"
        },
        url: "/profile"
      }
    }, 
    { 
      title: "African Bowl Weaving",
      photos: ["/images/africa-art.jpg"],
      continent: "African",
      country: "Etheopian",
      type: "Art",
      blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
      teacher: {
        image: "/images/Nikhita.png",
        name: {
          first: "Nikhita",
          last: "Obeegadoo"
        },
        url: "/profile"
      }
    },
  	]);
 	/*Class.find(function(error, classes) {
 		if(error) {
 			throw error;
 		} else {
 			response.json(200, classes);
 		}
 	});*/
});

app.get('/profile', function(request, response) {
	response.render('pages/profile.html');
});

app.get('/review', function(request, response) {
	response.render('pages/make_review.html');
});

app.get('/user/profile', function(request, response) {
	response.json([]);
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


