var mongoose = require('mongoose');

var mongodbUri = 'mongodb://heroku_r5qwbz8x:1bd9cddavabsbsui17ld16h1p9@ds027335.mongolab.com:27335/heroku_r5qwbz8x';

mongoose.connect(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

  // Create song schema
  var classSchema = mongoose.Schema({
    name: String,						//name of class
    blurb: String,						//blurb about the class
    teacher: ObjectId, 					//id of teacher
    photos: [String],					//name of photo for cover picture
    url: String,						//url to get to class
    reviews: [ObjectId],					//ids of reviews for class
    rating: Number,						//rating out of 5 stars
    location: {street: String, city: String, cc: String},	//location string {street, city, country code}
    radius: Number,						//the preferred max radius for ppl to be in the class
    culture: [ObjectId],				//ids of cultures that it belongs to (European, French, Parisian)
  	type: ObjectId,						//id of class type (dance, cooking, etc.)
  	numberOfSpots: Number,				//number of people allowed to participate in class
  	feed: Boolean,						//true if has fee, false if doesn't. can only have fee if approved
  	fee: Number,						//holds actual value of fee if feed class
  	sessions: [{dates: [Date], numberParticipants: Number}],	//dates the class is offered, Number of People Signed up
  	tags: [String]						//tags
  	meta: {								//meta data
  		favs: Number,					//number of favorites class has
  		thumbsUp: Number 				//number of thumbsup the class has
  	}
  });

  var reviewSchema = mongoose.Schema({
  	user: ObjectId,						//id of user who created review
  	class: ObjectId,					//id of class the review is for
  	message: String,					//text of review
  	datePosted: { type: Date, default: Date.now } 					//Date the review was posted
  });

  var userSchema = mongoose.Schema({
  	name: {
  		first: String, 
  		last: String
  	},
  	email: String,						//persons email
  	location: {street: String, city: String, cc: String}, //persons default location
  	language: String,					//persons preferred/first language
  	signedUp: [ObjectId],				//id of the class they are currently signed up to take
  	teaching: [ObjectId], 				//id of the classes they are signed up to teach
  	took: [ObjectId],					//id of the classes they already took
  	taught: [ObjectId],					//id of past classes they taught
  	favs: [ObjectId],					//ids of classes they have favorited
  	newcomer: Boolean,					//true if you consider yourself a newcomer, false if local
  });

  var locationsSchema = mongoose.Schema({
  	name: String,						//name of place
  	location: {street: String, city: String, cc: String},	//address
  	availableSpaces: [{room: String, timesAvailable: [Date], timesBooked: [Date], capacity: Number}], //array of available rooms in the space, the times it is available, and room capacity
  	fee: {type: Number, default: -1 }						//0 if no fee to use space, otherwise some value
  });

  var culturesSchema = mongoose.Schema({
  	name: String,						//name of the culture
  	city: String,						//city that the culture is from
  	country: String,					//country that the culture is from
  	continent: String 					//continent that the culture is from
  });

  module.exports = mongoose.model('Class', classSchema);
  module.exports = mongoose.model('Review', reviewSchema);
  module.exports = mongoose.model('User', userSchema);
  module.exports = mongoose.model('Location', locationsSchema);
  module.exports = mongoose.model('Culture', culturesSchema);

});