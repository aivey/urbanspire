var User = require('../models/user');
var Class = require('../models/class');
var ClassType = require('../models/classtype');
var Review = require('../models/review');
var Culture = require('../models/culture');
var Location = require('../models/location');
//var Models = require('../models/models.js');
//var flickr = require('../lib/flickr');
//var Post = require('../models/post');

module.exports = function(app, passport, db) {
	app.get('/', function(request, response) {
	  response.render('pages/home.html', { 'user': request.user });
	  //response.render('pages/login.html');
	});

	app.get('/home', function(request, response) {
		//console.log("something");
		response.render('pages/home.html', { 'user': request.user });
	});

	app.get('/login', function(request, response) {
		request.logout();
		response.render('pages/login.html', { message: request.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/home',
		failureRedirect: '/login',
		failureFlash: true
	}));
	// app.post('/login', function(request, response) {
	// 	//verify all the required fields have been given
	// 	if(request.body.email && request.body.password) {
	// 		var user = User.find({
	// 			email: request.body.email,
	// 			password: request.body.password,
	// 		}, function (error, user) {
	// 			if(error) {
	// 	 			throw error;
	// 	 		} else {
	// 	 			//request.session.user = user;
	// 	 			response.json(200, user);
	// 	 		}
	// 		});
	//  	}
	// });

	app.get('/signup', function(request, response) {
		request.logout();
		response.render('pages/signup.html', { message: request.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/home',	// redirect to the home page
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	// app.post('/signup', function(request, response) {
	// 	//verify all the required fields have been given
	// 	if(request.body.first && request.body.last && request.body.email && request.body.password) {
	// 		var newUser = new User({
	// 			name: { 
	// 				first: request.body.first,
	// 				last: request.body.last
	// 			},
	// 			email: request.body.email,
	// 			password: request.body.password,
	// 			location: { street: request.body.street, city: request.body.city, cc: request.body.cc },
	// 			newcomer: request.body.newcomer
	// 		});
		 	
	// 	 	newUser.save(function(error) {
	// 	 		if(error) {
	// 	 			throw error;
	// 	 		} else {
	// 	 			//request.session.user = newUser;
	// 	 			response.json(200, newUser);
	// 	 		}
	// 	 	});
	//  	}
	// });

	app.get('/logout', function(req, res) {
		req.logout();
		//res.json(200, "Successfully logged out");
		res.redirect('/');
	});

	app.get('/learn', function(request, response) {
		response.render('pages/learn.html', { 'user': request.user });
	});

	app.get('/my_classes', isLoggedIn, function(request, response) {
		response.render('pages/my_classes.html', { 'user': request.user });
	});

	app.get('/my_teachings', isLoggedIn, function(request, response) {
		response.render('pages/my_teachings.html', { 'user': request.user });
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
		response.render('pages/teach.html', { 'user': request.user });
	});

	app.post('/teach', function(request, response) {

	});

	app.get('/review', isLoggedIn, function(request, response) {

		if(request.query.id) {
			Class.find({ _id: request.query.id }, function(error, classs) {
				if(error) {
					throw error;
				} else if(classs.length === 0) {
					throw new Error('cant find class');
				} else {
					var data = classs[0];
					response.render('pages/make_review', { 'user': request.user, 'classdata': data });
				}
			});
		}

		//response.render('pages/make_review', { 'classdata' : cdata });
	});

	app.get('/class', function(request, response) {
// 		var data = {
// 		    "_id": {
// 		        "$oid": "56c54b8e65d9d4db85dc6281"
// 		    },
// 		    "name": "Vietnamese Bahn Mi Sandwich Making",
// 		    "blurb": "Sandwiches made using traditional Vietnamese baguette-like bread, and combining ingredients from the French culinary tradition (such as duck and mayonnaise) with traditional Vietnamese vegetables and other ingredients. Vegetarian options available, please bring your own ingredients (which we can decide upon beforehand)!",
// 		    "rating": 4,
// 		    "teacher": "56c54b8e65d9d4db85dc627c",
// 		    "location": "584 Mayfield Avenue, Stanford CA",
// 		    "group": true,
// 		    "culture": 1,
// 		    "cultureCountry": "Vietnam",
// 		    "cultureContinent": "Asia",
// 		    "alreadySignedUp": false,
// 		    "type": 1,
// 		    "numberOfSpots": 10,
// 		    "feed": true,
// 		    "fee": 10.00,
// 		    "tags": [],
// 		    "sessions": [ 
// 		    	{ "date": "2/27/16", "startTime": "5:30 PM", "endTime": "7:30 PM", participants: []},
// 		    	{ "date": "2/28/16", "startTime": "5:30 PM", "endTime": "7:30 PM", participants: []}
// 		    ],
// 		    "photos": [
// 		        "/images/bahnmi.jpeg"
// 		    ],
// 		    "__v": 0
// 		};

// 		var profiledata = {
// 		    "_id": "56c54b8e65d9d4db85dc627c",
// 		    "email": "vinh.phan31@gmail.com",
// 		    "num": 2,
// 		    "description": "I moved from Vietnam a year ago to the USA. I am still getting accustomed to american culture. I often miss home and would like to share some of my culture with you all!",
// 		    "connections": 0,
// 		    "favs": [],
// 		    "taught": [],
// 		    "took": [],
// 		    "teaching": [],
// 		    "signedUp": [],
// 		    "image": "defaultProfileImage.png",
// 		    "name": {
// 		        "first": "Vinh",
// 		        "last": "Phan"
// 		    },
// 		    "__v": 0
// 		};

// 		var review = [{
// 			"user": {
// 			    "_id": {
// 			        "$oid": "56c54b8e65d9d4db85dc627b"
// 			    },
// 			    "email": "adrienne.nowal@gmail.com",
// 			    "num": 1,
// 			    "description": "I'm originally from LA and love to learn about other cultures!",
// 			    "connections": 0,
// 			    "favs": [],
// 			    "taught": [],
// 			    "took": [],
// 			    "teaching": [],
// 			    "signedUp": [],
// 			    "image": "defaultProfileImage.png",
// 			    "name": {
// 			        "first": "Adrienne",
// 			        "last": "Nowalkha"
// 			    },
// 			    "__v": 0
// 			},
// 			"message": "Really enjoyed this. Best Class Ever!",
// 			"datePosted": "12/3/15"
// 		}];

// 		response.render('pages/class_description', { 'user': request.user, 'classdata' : data, 'profile': profiledata, 'reviews': review });

		findClassWithTeacherReview(request.query.id, function(error, data) {
			if(error) {
				console.log(error);
				throw error;
			} else {
				console.log(data);
				response.render('pages/class_description', { 'user': request.user, 'classdata': data });
			}
		});
		//console.log(data);
		

		// if(request.query.id) {
		// 	Class.find({ _id: request.query.id }, function(error, classs) {
		// 		if(error) {
		// 			throw error;
		// 		} else if(classs.length === 0) {
		// 			throw new Error('cant find class');
		// 		} else {
		// 			var data = classs[0];
		// 			console.log(data);
		// 			User.findOne({ _id: data.teacher }, function(error, teacher) {
		// 				if(error) {
		// 					throw error;
		// 				} else if (!teacher) {
		// 					throw new Error("couldn't find teacher");
		// 				} else {
		// 					response.render('pages/class_description', { 'user': request.user, 'classdata': data, profile: profiledata, 'reviews': review });
		// 				}
		// 			});
		// 			response.render('pages/class_description', { 'user': request.user, 'classdata': data, profile: profiledata, 'reviews': review });
		// 		}
		// 	});
		// }

	});

	app.post('/class/add', isLoggedIn, function(request, response) {
		if(request.body.cultureContinent && request.body.cultureCountry) {
			var newClass = new Class({
				name: request.body.classname,
				blurb: request.body.blurb,
				teacher: request.user._id,
				teacherFirst: request.user.name.first,
				teacherImage: request.user.image,
				location: request.body.locationString,
				cultureCity: request.body.cultureCity,
				cultureCountry: request.body.cultureCountry,
				cultureContinent: request.body.cultureContinent,
				type: Number(request.body.activityType),
				group: request.body.group,
				numberOfSpots: Number(request.body.numberOfSpots),
				feed: request.body.feed,
				fee: Number(request.body.fee),
				sessions: request.body.sessions
			});

			console.log(newClass);

			newClass.save(function(error) {
		 		if(error) {
		 			console.log(error);
		 			throw error;
		 		} else {
		 			console.log("success making class");
		 			request.user.teaching.push(newClass._id);
		 			request.user.save(function(err) {
		 				if(err) {
		 					console.log(err);
		 					newClass.remove();
		 					throw error;
		 				} else {
		 					response.status(200).json(newClass);
		 				}
		 			})
		 		}
		 	});
		}
	});

	app.post('/class/addParticipant', isLoggedIn, function(request, response) {
		console.log(request.body);
		if(request.body.classId && request.body.sessionIndex) {
			console.log("i got here");
			Class.find({ _id: request.body.classId }, function(error, classs) {
				if (error) {
					console.log(error);
					throw err;
				} else if (classs.length === 0) {
					throw new Error("Can't find Class!");
				} else {
					var theClass = classs[0];
					theClass.sessions[request.body.sessionIndex].participants.push(request.user._id);
					theClass.save(function(err) {
		 				if(err) {
		 					console.log(err);
		 					throw error;
		 				} else {
		 					response.json(200, theClass);
		 				}
		 			});
				}
			});

			User.find({ _id: request.user._id }, function(errors, users){
				if (errors) {
					throw errors;
				} else if (users.length === 0) {
					throw new Error("Can't find Class!");
				} else {
					var user = users[0];
					user.signedUp.push(request.body.classId);
					user.save(function(errorss) {
		 				if(errorss) {
		 					throw errorss;
		 				} else {
		 					response.json(200, user);
		 				}
		 			});
				} 
			});
		}
	});

	app.get('/class/upcomingClasses', function(request, response) {
		// response.json([{
		// 		    "_id": "56c54b8e65d9d4db85dc6292",
		// 		    "name": "Portuguese Literature from Mozambique",
		// 		    "blurb": "Delving into literature written in Portuguese from Mozambique. Reading suggestions welcome.",
		// 		    "teacher": 7,
		// 		    "culture": 5,
		// 		    "continent": "African",
	 //              	"country": "Mozambique",
		// 		    "type": 3,
		// 		    "numberOfSpots": 5,
		// 		    "tags": [],
		// 		    "sessions": [],
		// 		    "photos": [
		// 		        "/images/portuguesebooks.jpg"
		// 		    ],
		// 		    "__v": 0,
		// 		    teacher: {
	 //                image: "/images/omi.jpeg",
	 //                name: {
	 //                  first: "Omi",
	 //                  last: "Odo"
	 //                },
	 //                url: "/profile"
	 //              }
		// 		}, 
	 //            {
		// 		    "_id": "56c54b8e65d9d4db85dc6281",
		// 		    "name": "Vietnamese Bahn Mi Sandwich Making",
		// 		    "blurb": "Sandwiches made using traditional Vietnamese baguette-like bread, and combining ingredients from the French culinary tradition (such as duck and mayonnaise) with traditional Vietnamese vegetables and other ingredients. Vegetarian options available, please bring your own ingredients (which we can decide upon beforehand)!",
		// 		    "teacher": 2,
		// 		    "culture": 1,
		// 		    "continent": "Asian",
	 //              	"country": "Vietnamese",
		// 		    "type": 1,
		// 		    "numberOfSpots": 10,
		// 		    "tags": [],
		// 		    "sessions": [],
		// 		    "photos": [
		// 		        "/images/bahnmi.jpeg"
		// 		    ],
		// 		    "__v": 0,
		// 		    teacher: {
	 //                image: "/images/matthew.png",
	 //                name: {
	 //                  first: "Vihn",
	 //                  last: "Phan"
	 //                },
	 //                url: "/profile"
	 //              }
		// 		}]);
		if(request.user) {
			findClassesWithTeacher(request.user.signedUp, function(error, data) {
				if(error) {
					throw error;
				} else {
					console.log(data);
					response.status(200).json(data);
				}
			});
		}

		// if(request.user) {
		// 	Class.find({ _id: { $in: request.user.signedUp }}, function(error, classes) {
		// 		if(error) {
		// 			throw error;
		// 		} else {
		// 			var data = classes;
		// 			console.log(data);
		// 			response.json(data);
		// 		}
		// 	});
		// }
	});

	app.get('/class/upcomingTeachings', function(request, response) {
		// response.json([{
		// 		    "_id": "56c54b8e65d9d4db85dc6298",
		// 		    "name": "Traditional Kenyan Folk Song",
		// 		    "blurb": "Come to have fun and learn to sing popular Kenyan folk songs such as \u201cWana Barak\u201d and \u201cMalaika\u201d",
		// 		    "teacher": 4,
		// 		    "culture": 10,
		// 		    "continent": "African",
		// 		    "country": "Kenyan",
		// 		    "type": 4,
		// 		    "numberOfSpots": 5,
		// 		    "tags": [],
		// 		    "sessions": [],
		// 		    "photos": [
		// 		        "/images/kenyanfolkdance.jpg"
		// 		    ],
		// 		    "__v": 0,
		// 		    teacher: {
		//                 image: "/images/Asli.png",
		//                 name: {
		//                   first: "Asli",
		//                   last: "Odi"
		//                 },
		//                 url: "/profile"
		//             }
		// 		}, 
	 //            { 
	 //              name: "African Bowl Weaving",
	 //              photos: ["/images/africa-art.jpg"],
	 //              continent: "African",
	 //              country: "Etheopian",
	 //              type: "Art",
	 //              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
	 //              teacher: {
		//                 image: "/images/Asli.png",
		//                 name: {
		//                   first: "Asli",
		//                   last: "Odi"
		//                 },
		//                 url: "/profile"
		//             }
	 //            },
	 //            {
		// 		    "name": "Jollof Rice!",
		// 		    "blurb": "Come make traditional Nigerian Jollof Rice!",
		// 		    "teacher": 4,
		// 		    "culture": 10,
		// 		    "continent": "African",
		// 		    "country": "Nigerian",
		// 		    "type": 4,
		// 		    "numberOfSpots": 5,
		// 		    "tags": [],
		// 		    "sessions": [],
		// 		    "photos": [
		// 		        "/images/jollof.jpeg"
		// 		    ],
		// 		    "__v": 0,
		// 		    teacher: {
		// 	                image: "/images/Asli.png",
		// 	                name: {
		// 	                  first: "Asli",
		// 	                  last: "Odi"
		// 	                },
		// 	                url: "/profile"
		//             	}
		// 		}]);
		// if(request.user) {
		// 	Class.find({ _id: { $in: request.user.teaching }}, function(error, classes) {
		// 		if(error) {
		// 			throw error;
		// 		} else {
		// 			var data = classes;
		// 			console.log(data);
		// 			response.json(data);
		// 		}
		// 	});
		// }
		if(request.user) {
			findClassesWithTeacher(request.user.teaching, function(error, data) {
				if(error) {
					console.log(error);
					throw error;
				} else {
					console.log(data);
					response.status(200).json(data);
				}
			});
		}
	});

	app.get('/class/pastClasses', function(request, response) {
				// response.json([{
	   //            name: "Irish Dancing",
	   //            photos: ["/images/irish_dance.png"],
	   //            continent: "European",
	   //            country: "Irish",
	   //            type: "Dance",
	   //            blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
	   //            teacher: {
	   //              image: "/images/Margaret.png",
	   //              name: {
	   //                first: "Margaret",
	   //                last: "Markin"
	   //              },
	   //              url: "/profile"
	   //            }
	   //          }, 
	   //          {
				//     "_id": {
				//         "$oid": "56c54b8e65d9d4db85dc6294"
				//     },
				//     "name": "Bollywood Dance from the 90s",
				//     "blurb": "Let's Dance to Bollywood Hits from the Golden Ages!",
				//     "teacher": 8,
				//     "culture": 6,
				//     "continent": "Asian",
				//     "country": "Indian",
				//     "type": 2,
				//     "numberOfSpots": 5,
				//     "tags": [],
				//     "sessions": [],
				//     "photos": [
				//         "/images/bollywood.jpg"
				//     ],
				//     "__v": 0,
				//     teacher: {
		  //               image: "/images/Nikhita.png",
		  //               name: {
		  //                 first: "Nikhita",
		  //                 last: "Obeegadoo"
		  //               },
		  //               url: "/profile"
	   //            	}
				// }]);
	
		// //request.query.id = "56c54b8e65d9d4db85dc6294";
		// if(request.user) {
		// 	Class.find({ _id: { $in: request.user.took }}, function(error, classes) {
		// 		if(error) {
		// 			throw error;
		// 		} else {
		// 			var data = classes;
		// 			console.log(data);
		// 			response.json(data);
		// 		}
		// 	});
		// }
		if(request.user) {
			findClassesWithTeacher(request.user.took, function(error, data) {
				if(error) {
					throw error;
				} else {
					console.log(data);
					response.status(200).json(data);
				}
			});
		}

	});

	app.get('/class/pastTeachings', isLoggedIn, function(request, response) {
		// response.json([
	 //            {
		// 		    "_id": "56c54b8e65d9d4db85dc629a",
		// 		    "name": "Talking about Ugandan Politics: The Art of Corruption",
		// 		    "blurb": "Corruption is a prevalent issue in Ugandan politics: come join us for a healthy debate about its complex realities.",
		// 		    "teacher": 5,
		// 		    "culture": 99,
		// 		    "continent": "African",
		// 		    "country": "Ugandan",
		// 		    "type": 3,
		// 		    "numberOfSpots": 5,
		// 		    "tags": [],
		// 		    "sessions": [],
		// 		    "photos": [
		// 		        "/images/ugandapolitics.jpg"
		// 		    ],
		// 		    "__v": 0,
		// 		    teacher: {
		//                 image: "/images/Asli.png",
		//                 name: {
		//                   first: "Asli",
		//                   last: "Odi"
		//                 },
		//                 url: "/profile"
		//             }
		// 		}, 
	 //            { 
	 //              name: "African Bowl Weaving",
	 //              photos: ["/images/africa-art.jpg"],
	 //              continent: "African",
	 //              country: "Etheopian",
	 //              type: "Art",
	 //              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
	 //              teacher: {
		//                 image: "/images/Asli.png",
		//                 name: {
		//                   first: "Asli",
		//                   last: "Odi"
		//                 },
		//                 url: "/profile"
		//             }
	 //            }
	 //          ]);
		// if(request.user) {
		// 	Class.find({ _id: { $in: request.user.taught }}, function(error, classes) {
		// 		if(error) {
		// 			throw error;
		// 		} else {
		// 			var data = classes;
		// 			console.log(data);
		// 			response.json(data);
		// 		}
		// 	});
		// }
		if(request.user) {
			findClassesWithTeacher(request.user.taught, function(error, data) {
				if(error) {
					throw error;
				} else {
					console.log(data);
					response.status(200).json(data);
				}
			});
		}
	});

	app.get('/class/pastTeachingsById', function(request, response) {
		if(request.query.id) {
			User.findOne({ _id: request.query.id }, function(error, teacher) {
				if(error) {
					throw error;
				} else if (!teacher) {
					throw new Error("User not found");
				} else {
					Class.find({ _id: { $in: teacher.taught }}, function(error, classes) {
						if(error) throw error;
						else {
							var data = [];
							classes.forEach(function(classs, index) {
								classs.teacherData = teacher;
								data.push(classs);
							});
							console.log(data);
							response.status(200).json(data);
						}
					});
				}
			});
		}
	});

	app.get('/class/upcomingTeachingsById', function(request, response) {
		if(request.query.id) {
			User.findOne({ _id: request.query.id }, function(error, teacher) {
				if(error) {
					throw error;
				} else if (!teacher) {
					throw new Error("User not found");
				}else {
					Class.find({ _id: { $in: teacher.teaching }}, function(error, classes) {
						if(error) {
							throw error;
						} else {
							var data = [];
							classes.forEach(function(classs, index) {
								classs.teacherData = teacher;
								data.push(classs);
							});
							console.log(data);
							response.status(200).json(data);
						}
					});
				}
			});
		}
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
              Class.find({ $or: [ { "culture": {$in: cultureNums }}, { "cultureContinent" : culture } ] }, function(error, classes) {
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
              Class.find({ $and: [
              		{ $or: [ { "culture": {$in: cultureNums }}, { "cultureContinent" : culture } ] }, 
              		{"type": params.activity }
              	]}, function(error, classes) {
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

	app.get('/profile', isLoggedIn, function(request, response) {
		response.render('pages/profile.html', { 'user': request.user });
	});

	app.post('/review/add', isLoggedIn, function(request, response) {
		if(request.body.classId && request.body.message && request.body.stars) {
			var review = new Review({
				userId: request.user._id,
				userName: request.user.name.first,
				userImage: request.user.image,
				classId: request.body.classId,
				message: request.body.message,
				stars: request.body.stars
			});

			//console.log(review);

			review.save(function(error) {
		 		if(error) {
		 			throw error;
		 		} else {
		 			Class.findOne({ _id: request.body.classId}, function(error, classs) {
		 				if (error) {
		 					review.remove();
		 					throw error;
		 				} else {
		 					classs.totalRating += Number(request.body.stars);
		 					classs.numRatings += 1;
		 					classs.save(function(error) {
		 						if(error) {
		 							console.log(error);
		 							review.remove();
		 							throw error;
		 						} else {
		 							response.status(200).json(review);
		 						}
		 					});
		 				}
		 			});
		 		}
		 	});
		}
	});

	app.get('/userprofile', function(request, response) {
		User.find({ _id: request.query.id }, function(error, user) {
			if(error) {
				throw error;
			} else if (user.length === 0 ) {
				response.render('pages/userProfile.html', { 'user': request.user, message: 'This profile could not be found. Sorry!' });
			} else {
				var foundUser = user[0];
				response.render('pages/userProfile.html', { 'userProfile': foundUser, 'user': request.user });
				// Class.find({ "_id": {$in: foundUser.teaching }}, function(error, teachingClasses) {
				// 	if(error) {
				// 		throw error;
				// 	} else {
				// 		foundUser.upcomingTeachings = teachingClasses;
				// 		Class.find( {"_id": {$in: foundUser.taught }}, function(error, taught) {
				// 			if (error) {
				// 				throw error;
				// 			} else {
				// 				foundUser.pastTeachings = taught;
				// 				response.render('pages/userProfile.html', { 'userProfile': foundUser, 'user': request.user });
				// 			}
				// 		});
				// 	}
				// });				
			}
		});
	});

	app.get('/databaseSetup', function(request, response) {
		Models.DatabaseSetup('/databaseSetup');
	  	response.render('pages/home.html', { 'user': request.user });
	});

};

function findClassesWithTeacher(ids, callback) {

	if(ids) {
		Class.find({ _id: { $in: ids } }, function(error, classes) {
			if(error) {
				console.log(error);
				callback(error, null);
			} else {
				var data = [];
				console.log(classes);
				callback(error, classes);
				// classes.forEach(function(classs, index) {
				// 	var newClass = classs;
				// 	User.findOne({ _id: classs.teacher }, function(err, teacher) {
				// 		if(err) {
				// 			console.log(err);
				// 			newClass.teacherData = null;
				// 		} else {
				// 			newClass.teacherData = teacher;
				// 			console.log(newClass);
				// 		}
				// 		data.push(newClass);
				// 		if(data.length === classes.length) callback(null, data);
				// 	});
				// });
				// callback(error, classes);
			}
		});
	}

	// Class.aggregate([
	// 	{ $match: { $in : ids } },
	// 	{ $lookup: {
	// 			from: 'users',
	// 			localField: 'teacher',
	// 			foreignField: '_id',
	// 			as: 'teacherData'
	// 		}
	// 	}
	// ], function(error, classes) {
	// 	if(error) {
	// 		throw error;
	// 	} else {
	// 		return classes;
	// 	}
	// });
}

function findClassWithTeacher(id, callback) {
	if(id) {
		Class.findOne({ _id: id }, function(error, classs) {
			if(error) {
				callback(error, null, null);
			} else if(classs.length === 0) {
				callback(new Error('cant find class'), null, null);
			} else {
				var data = classs;
				console.log(data);
				User.findOne({ _id: data.teacher }, function(err, teacher) {
					if(err) {
						callback(err, null, null);
					} else if (!teacher) {
						callback(new Error("couldn't find teacher"), null, null);
					} else {
						callback(errors, data, teacher);
					}
				});
			}
		});
	}
	// Class.aggregate([
	// 	{ $match: { _id : id } },
	// 	{ $lookup: {
	// 			from: 'users',
	// 			localField: 'teacher',
	// 			foreignField: '_id',
	// 			as: 'teacherData'
	// 		}
	// 	}
	// ], function(error, classdata) {
	// 	if(error) {
	// 		throw error;
	// 	} else {
	// 		return classdata[0];
	// 	}
	// });
}

function findClassesWithTeacherReview(ids, callback) {
	if(ids) {
		Class.find({ _id: { $in: ids } }, function(error, classes) {
			if(error) {
				callback(error, null);
			} else {
				var data = [];
				classes.forEach(function(classs, index) {
					User.findOne({ _id: classs.teacher }, function(err, teacher) {
						if(err) {
							classs.teacherData = null;
						} else {
							classs.teacherData = teacher;
							Review.find({ classId : classs._id }, function(errors, reviews) {
								if(err) {
									classs.reviews = null;
								} else {
									classs.reviews = reviews;
								}
								data.push(classs);
								if(data.length === classes.length) callback(null, data);
							});
						}
					});
				});
			}
		});
	}

	// Class.aggregate([
	// 	{ $match: { $in : ids } },
	// 	{ $lookup: {
	// 			from: 'users',
	// 			localField: 'teacher',
	// 			foreignField: '_id',
	// 			as: 'teacherData'
	// 		}
	// 	},
	// 	{ $lookup: {
	// 			from: 'reviews',
	// 			localField: '_id',
	// 			foreignField: 'classId',
	// 			as: 'reviews'
	// 		}
	// 	}
	// ], function(error, classes) {
	// 	if(error) {
	// 		throw error;
	// 	} else {
	// 		return classes;
	// 	}
	// });
}

function findClassWithTeacherReview(id, callback) {
	if(id) {
		Class.findOne({ _id: id }, function(error, classs) {
			if(error) {
				callback(error, null);
			} else if(classs.length === 0) {
				callback(new Error('cant find class'), null);
			} else {
				var data = classs;
				console.log(data);
				User.findOne({ _id: data.teacher }, function(err, teacher) {
					if(err) {
						callback(err, null);
					} else if (!teacher) {
						callback(new Error("couldn't find teacher"), null);
					} else {
						data.teacherData = teacher;
						Review.find({ classId : id }, function(errors, reviews) {
							data.reviews = reviews;
							callback(errors, data);
						});
					}
				});
			}
		});
	}

	// console.log(id);
	// db.classes.aggregate([
	// 	{ $match: { _id : id } },
	// 	{ $lookup: {
	// 			from: 'users',
	// 			localField: 'teacher',
	// 			foreignField: '_id',
	// 			as: 'teacherData'
	// 		}
	// 	},
	// 	{ $lookup: {
	// 			from: 'reviews',
	// 			localField: '_id',
	// 			foreignField: 'classId',
	// 			as: 'reviews'
	// 		}
	// 	}
	// ], function(error, classdata) {
	// 	console.log("classdata");
	// 	callback(error, classdata[0]);
	// 	// if(error) {
	// 	// 	throw error;
	// 	// } else {
	// 	// 	console.log(classdata);
	// 	// 	return classdata[0];
	// 	// }
	// });
}

function isLoggedIn(req, res, next) {
	//if user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
		return next();
	}

	//if they aren't redirect them to the home page
	res.redirect('/');
}
