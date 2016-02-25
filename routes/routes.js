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
		 			//request.session.user = user;
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
		 			//request.session.user = newUser;
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

	app.get('/class', function(request, response) {
		var data = {
		    "_id": {
		        "$oid": "56c54b8e65d9d4db85dc6281"
		    },
		    "name": "Vietnamese Bahn Mi Sandwich Making",
		    "blurb": "Sandwiches made using traditional Vietnamese baguette-like bread, and combining ingredients from the French culinary tradition (such as duck and mayonnaise) with traditional Vietnamese vegetables and other ingredients. Vegetarian options available, please bring your own ingredients (which we can decide upon beforehand)!",
		    "rating": 4,
		    "teacher": "56c54b8e65d9d4db85dc627c",
		    "location": "584 Mayfield Avenue, Stanford CA",
		    "group": true,
		    "culture": 1,
		    "cultureCountry": "Vietnam",
		    "cultureContinent": "Asia",
		    "alreadySignedUp": false,
		    "type": 1,
		    "numberOfSpots": 10,
		    "feed": true,
		    "fee": 10.00,
		    "tags": [],
		    "sessions": [ 
		    	{ "date": "2/27/16", "startTime": "5:30 PM", "endTime": "7:30 PM", participants: []},
		    	{ "date": "2/28/16", "startTime": "5:30 PM", "endTime": "7:30 PM", participants: []}
		    ],
		    "photos": [
		        "/images/bahnmi.jpeg"
		    ],
		    "__v": 0
		};

		var profiledata = {
		    "_id": {
		        "$oid": "56c54b8e65d9d4db85dc627c"
		    },
		    "email": "vinh.phan31@gmail.com",
		    "num": 2,
		    "description": "I moved from Vietnam a year ago to the USA. I am still getting accustomed to american culture. I often miss home and would like to share some of my culture with you all!",
		    "connections": 0,
		    "favs": [],
		    "taught": [],
		    "took": [],
		    "teaching": [],
		    "signedUp": [],
		    "image": "defaultProfileImage.png",
		    "name": {
		        "first": "Vinh",
		        "last": "Phan"
		    },
		    "__v": 0
		};

		var review = [{
			"user": {
			    "_id": {
			        "$oid": "56c54b8e65d9d4db85dc627b"
			    },
			    "email": "adrienne.nowal@gmail.com",
			    "num": 1,
			    "description": "I'm originally from LA and love to learn about other cultures!",
			    "connections": 0,
			    "favs": [],
			    "taught": [],
			    "took": [],
			    "teaching": [],
			    "signedUp": [],
			    "image": "defaultProfileImage.png",
			    "name": {
			        "first": "Adrienne",
			        "last": "Nowalkha"
			    },
			    "__v": 0
			},
			"message": "Really enjoyed this. Best Class Ever!",
			"datePosted": "12/3/15"
		}];

		response.render('pages/class_description', { 'classdata' : data, 'profile': profiledata, 'reviews': review });

		// if(request.query.id) {
		// 	Class.find({ _id: request.query.id }, function(error, classs) {
		// 		if(error) {
		// 			throw error;
		// 		} else if(classs.length === 0) {
		// 			throw new Exception('cant find class');
		// 		} else {
		// 			var data = classs[0];
		// 			console.log(data);
		// 			response.render('pages/class_description', { 'classdata': data , profile: profile});
		// 		}
		// 	});
		// }
	});

	app.post('/class/add', function(request, response) {
		console.log(request);
		console.log(request.body);
		if(request.body.cultureContinent && request.body.cultureCountry) {
			var newClass = new Class({
				name: request.body.name,
				blurb: request.body.blurb,
				teacher: request.body.teacherId,
				location: request.body.locationString,
				cultureCity: request.body.cultureCity,
				cultureCountry: request.body.cultureCountry,
				cultureContinent: request.body.cultureContinent,
				type: request.body.activityType,
				group: request.body.group,
				numberOfSpots: request.body.classSize,
				feed: request.body.feed,
				fee: request.body.fee,
				sessions: request.body.sessions
			});

			newClass.save(function(error) {
		 		if(error) {
		 			throw error;
		 		} else {
		 			response.json(200, newClass);
		 		}
		 	});
		}
	});

	app.post('/class/addParticipant', function(request, response) {
		if(request.body.classId && request.body.userId && request.body.sessionIndex) {
			Class.find({ _id: request.body.classId }, function(error, classs) {
				if (error) {
					throw err;
				} else if (classs.length === 0) {
					throw new Exception("Can't find Class!");
				} else {
					var theClass = classs[0];
					theClass.sessions[request.body.sessionIndex].participants.push(request.body.userId);
					theClass.save(function(error) {
		 				if(error) {
		 					throw error;
		 				} else {
		 					response.json(200, theClass);
		 				}
		 			});
				}
			});

			User.find({ _id: request.body.userId }, function(error, users){
				if (error) {
					throw err;
				} else if (users.length === 0) {
					throw new Exception("Can't find Class!");
				} else {
					var user = users[0];
					user.signedUp.push(request.body.classId);
					user.save(function(error) {
		 				if(error) {
		 					throw error;
		 				} else {
		 					response.json(200, user);
		 				}
		 			});
				} 
			});
		}
	});

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

        console.log(params);

        if(! params.culture) {
        	params.culture = 0;
        }
        if(! params.activity) {
        	params.activity = 0;
        }
        if(! params.radius) {
        	params.radius = 0;
        }

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

        console.log(params);

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

	app.post('/review/add', function(request, response) {
		if(request.body.classId && request.body.userId && request.body.message && request.body.stars) {
			var review = new Review({
				userId: request.body.userId,
				classId: request.body.classId,
				message: request.body.message,
				stars: request.body.stars
			});

			review.save(function(error) {
		 		if(error) {
		 			throw error;
		 		} else {
		 			response.json(200, review);
		 		}
		 	});
		}
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
