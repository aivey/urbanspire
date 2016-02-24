var User = require('../models/user');
var Class = require('../models/class');
var ClassType = require('../models/classtype');
var Review = require('../models/review');
var Culture = require('../models/culture');
var Location = require('../models/location');
//var Models = require('../models/models.js');
//var flickr = require('../lib/flickr');
//var Post = require('../models/post');

module.exports = function(app) {
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
		 			req.session.user = user;
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
		if(request.body.first && request.body.last && request.body.email && request.body.password) {
			var newUser = new User({
				name: { 
					first: request.body.first,
					last: request.body.last
				},
				email: request.body.email,
				password: request.body.password,
				location: { street: request.body.street, city: request.body.city, cc: request.body.cc },
				newcomer: request.body.newcomer
			});
		 	
		 	newUser.save(function(error) {
		 		if(error) {
		 			throw error;
		 		} else {
		 			req.session.user = newUser;
		 			response.json(200, newUser);
		 		}
		 	});
	 	}
	});

	app.get('/learn', function(request, response) {
		response.render('pages/learn.html');
		//response.render('pages/learn_african_cooking.html');
	});

	app.get('/my_classes', function(request, response) {
		response.render('pages/my_classes.html');
	});

	app.get('/my_teachings', function(request, response) {
		response.render('pages/my_teachings.html');
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
        //var classes = [];
        var params = request.query;
        var culture = "";

        if(params.culture != 0) {
          if(params.culture == 1) {
            culture = "Asia";
          } else if(params.culture == 2) {
            culture = "Europe";
          } else if(params.culture == 3) {
            culture = "Africa";
          } else if(params.culture == 4) {
            culture = "Middle East";
          } else if(params.culture == 5) {
            culture = "South America";
          } else if(params.culture == 6) {
            culture = "North America";
          } 
        }

        if(params.culture == 0 && params.activity == 0) {
          Class.find(function(error, classes) {
            if(error) {
              throw error;
            } else {
              response.status(200).json(classes);
            }
          });
        } else if (params.culture != 0 && params.activity == 0) {
          Culture.find({ "continent": culture }, 'num', function(error, cultures) {
            if(error) {
              throw error;
            } else {
              cultureNums = [];
              cultures.forEach(function(element, index, array) {
                cultureNums.push(element.num);
              });
              Class.find({ "culture": {$in: cultureNums }}, function(error, classes) {
                if(error) {
                  throw error;
                } else {
                  response.status(200).json(classes);
                }
              });
            }
          });
        } else if (params.culture == 0 && params.activity != 0) {
          Class.find({ "type": params.activity }, function(error, classes) {
            if(error) {
              throw error;
            } else {
              response.status(200).json(classes);
            }
          });
        } else {
          var classesByCulture;
          Culture.find({ "continent": culture }, 'num', function(error, cultures) {
            if(error) {
              throw error;
            } else {
              cultureNums = [];
              cultures.forEach(function(element, index, array) {
                cultureNums.push(element.num);
              });
              console.log(cultureNums);
              console.log(params.activity);
              Class.find({ "culture": {$in: cultureNums }, "type": params.activity }, function(error, classes) {
                if(error) {
                  throw error;
                } else {
                  response.status(200).json(classes);
                }
              });
            }
          });
        }
		//Models.databaseQuery('/search', response, request.query);
	});

	app.get('/class/recommendations', function(request, response) {
        Class.find(function(error, classes) {
          if(error) {
            throw error;
          } else {
            response.status(200).json(classes);
          }
        });
	//Models.databaseQuery('/recommendations', response, null);
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

	app.get('/databaseSetup', function(request, response) {
		Models.DatabaseSetup('/databaseSetup');
	  	response.render('pages/home.html');
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
};