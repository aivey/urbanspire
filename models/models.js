var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var mongodbUri = 'mongodb://heroku_r5qwbz8x:1bd9cddavabsbsui17ld16h1p9@ds027335.mongolab.com:27335/heroku_r5qwbz8x';

mongoose.connect(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

  // Create song schema
  var classSchema = mongoose.Schema({
    name: { type: String, required: true },						//name of class
    blurb: { type: String, required: true },					//blurb about the class
    teacher: { type: ObjectId, required: true }, 					//id of teacher
    photos: [String],					//name of photo for cover picture
    url: String,						//url to get to class
    reviewStatus: Boolean,				//true if the class has passed and can now be reviewed, false otherwise
    reviews: [ObjectId],				//ids of reviews for class
    rating: Number,						//rating out of 5 stars
    location: { type: {street: String, city: String, state: String, cc: String}, required: true },	//location string {street, city, country code}
    radius: Number,						//the preferred max radius for ppl to be in the class
    cultupre: [ObjectId],				//ids of cultures that it belongs to (European, French, Parisian)
  	type: { type: ObjectId, required: true },						//id of class type (dance, cooking, etc.)
  	numberOfSpots: { type: Number, required: true, min: 0 },				//number of people allowed to participate in class
  	feed: Boolean,						//true if has fee, false if doesn't. can only have fee if approved
  	fee: Number,						//holds actual value of fee if feed class
  	sessions: { type: [{timeAndDates: [{start: Date, end: Date}], participants: [ObjectId], numberParticipants: Number, numWeeks: Number }], required: true },	//dates the class is offered, Number of People Signed up
  	tags: [String],						//tags
  	meta: {	type: {							//meta data
      favs: Number,					//number of favorites class has
  		thumbsUp: Number 				//number of thumbsup the class has
  	}, required: false }
  });

  var reviewSchema = mongoose.Schema({
  	user: { type: ObjectId, required: true },						//id of user who created review
  	class: { type: ObjectId, required: true },					                          //id of class the review is for
  	message: { type: String, required: true },
    stars: {type: Number, required: false},					                          //text of review
  	datePosted: { type: Date, default: Date.now } 			//Date the review was posted
  });

  var userSchema = mongoose.Schema({
  	name: {
  		first: { type: String, required: true }, 
  		last: { type: String, required: true }
  	},
  	email: { type: String, required: true, index: {unique: true} },						//persons email
    password: { type: String, required: true },
    description: String,
    image: { type: String, required: false, default: "defaultProfileImage.png" },
  	location: {street: String, city: String, cc: String}, //persons default location
  	language: String,					//persons preferred/first language
  	signedUp: [ObjectId],				//id of the class they are currently signed up to take
  	teaching: [ObjectId], 				//id of the classes they are signed up to teach
  	took: [ObjectId],					//id of the classes they already took
  	taught: [ObjectId],					//id of past classes they taught
  	favs: [ObjectId],					//ids of classes they have favorited
  	newcomer: Boolean,					//true if you consider yourself a newcomer, false if local
    teacher: Boolean,           //whether you are registered to teach
    connections: { type: Number, default: 0 }        //
  });

  var locationsSchema = mongoose.Schema({
  	name: { type: String, required: true, index: true },						                              //name of place
  	address: { type: {street: String, city: String, cc: String}, required: true, index: true },	//address
    loc: { type: [Number], index: '2d' },                //latitude and longitude of location
  	availableSpaces: [{room: String, timesAvailable: [Date], timesBooked: [Date], capacity: Number}], //array of available rooms in the space, the times it is available, and room capacity
  	fee: {type: Number, default: -1 }						          //0 if no fee to use space, otherwise some value
  });

  locationsSchema.index({ name: 1, location: -1 }, { unique: true });

  var culturesSchema = mongoose.Schema({
  	name: { type: String, required: true, index: { unique: true }},						//name of the culture
  	type: Number,						//0 for city, 1 for country, 2 for continent
  	city: String,						//city that the culture is from
  	country: String,					//country that the culture is from
  	continent: String 					//continent that the culture is from
  });

  var classTypesSchema = mongoose.Schema({
    type: { type: String, required: true, index: { unique: true }} //type of class. ex. Dancing, Art, etc.
  });

  module.exports = mongoose.model('Class', classSchema);
  module.exports = mongoose.model('Review', reviewSchema);
  module.exports = mongoose.model('User', userSchema);
  module.exports = mongoose.model('Location', locationsSchema);
  module.exports = mongoose.model('Culture', culturesSchema);
  module.exports = mongoose.model('ClassType', classTypesSchema);

});