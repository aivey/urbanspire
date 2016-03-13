var User = require('../models/user');
var Class = require('../models/class');
var ClassType = require('../models/classtype');
var Review = require('../models/review');
var Culture = require('../models/culture');
var Location = require('../models/location');

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

	app.get('/faq', function(request, response) {
		response.render('pages/faq.html', { 'user': request.user });
	});

	app.get('/aboutus', function(request, response) {
		response.render('pages/aboutus.html', { 'user': request.user });
	});

	app.get('/meettheteam', function(request, response) {
		response.render('pages/meettheteam.html', { 'user': request.user });
	});

	app.get('/contactus', function(request, response) {
		response.render('pages/contactus.html', { 'user': request.user });
	});

	app.get('/howitworks', function(request, response) {
		response.render('pages/howitworks.html', { 'user': request.user });
	});

	app.get('/loginpopup', function(request, response) {
		response.render('pages/loginpopup.html', { 'user': request.user });
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
				sessions: request.body.sessions,
				photos: request.body.photos
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
		// if(request.user) {
		// 	findClassesWithTeacher(request.user.signedUp, function(error, data) {
		// 		if(error) {
		// 			throw error;
		// 		} else {
		// 			console.log(data);
		// 			response.status(200).json(data);
		// 		}
		// 	});
		// }

		if(request.user) {
			Class.find({ _id: { $in: request.user.signedUp }}, function(error, classes) {
				if(error) {
					throw error;
				} else {
					var data = classes;
					console.log(data);
					response.status(200).json(data);
				}
			});
		}
	});

	app.get('/class/upcomingTeachings', function(request, response) {
		if(request.user) {
			Class.find({ _id: { $in: request.user.teaching }}, function(error, classes) {
				if(error) {
					throw error;
				} else {
					var data = classes;
					console.log(data);
					response.json(data);
				}
			});
		}
		// if(request.user) {
		// 	findClassesWithTeacher(request.user.teaching, function(error, data) {
		// 		if(error) {
		// 			console.log(error);
		// 			throw error;
		// 		} else {
		// 			console.log(data);
		// 			response.status(200).json(data);
		// 		}
		// 	});
		// }
	});

	app.get('/class/pastClasses', function(request, response) {
		// //request.query.id = "56c54b8e65d9d4db85dc6294";
		if(request.user) {
			Class.find({ _id: { $in: request.user.took }}, function(error, classes) {
				if(error) {
					throw error;
				} else {
					var data = classes;
					console.log(data);
					response.json(data);
				}
			});
		}
		// if(request.user) {
		// 	findClassesWithTeacher(request.user.took, function(error, data) {
		// 		if(error) {
		// 			throw error;
		// 		} else {
		// 			console.log(data);
		// 			response.status(200).json(data);
		// 		}
		// 	});
		// }

	});

	app.get('/class/pastTeachings', isLoggedIn, function(request, response) {
		if(request.user) {
			Class.find({ _id: { $in: request.user.taught }}, function(error, classes) {
				if(error) {
					throw error;
				} else {
					var data = classes;
					console.log(data);
					response.json(data);
				}
			});
		}
		// if(request.user) {
		// 	findClassesWithTeacher(request.user.taught, function(error, data) {
		// 		if(error) {
		// 			throw error;
		// 		} else {
		// 			console.log(data);
		// 			response.status(200).json(data);
		// 		}
		// 	});
		// }
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
	});

	app.get('/class/recommendations', function(request, response) {
        Class.find(function(error, classes) {
          if(error) {
            throw error;
          } else {
            response.status(200).json(classes);
          }
        });
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
