var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var classSchema = mongoose.Schema({
	name: { type: String, required: true },						//name of class
    blurb: { type: String, required: true },					//blurb about the class
    teacher: { type: ObjectId, required: true }, 					//id of teacher
    teacherFirst: { type: String, required: true },
    teacherImage: { type: String, required: true },
    image: { data: Buffer, contentType: String},
    photos: [String],					//name of photo for cover picture
    totalRating: { type: Number, default: 0},						//rating out of 5 stars
    numRatings: { type: Number, default: 0},       //number of times rated
    location: { type: String, required: true }, //{ type: {street: String, city: String, state: String, cc: String}, required: true },	//location string {street, city, country code}
    radius: Number,						//the preferred max radius for ppl to be in the class
    cultureCity: String,
    cultureCountry: String,
    cultureContinent: String,
    culture: Number,	//CHANGE BACK LATER			//ids of cultures that it belongs to (European, French, Parisian)
  	type: { type: Number, required: true }, //{ type: ObjectId, required: true },						//id of class type (dance, cooking, etc.)
  	group: { type: Boolean, required: true },
  	numberOfSpots: { type: Number, required: true, min: 0 },				//number of people allowed to participate in class
  	feed: Boolean,						//true if has fee, false if doesn't. can only have fee if approved
  	fee: Number,						//holds actual value of fee if feed class
  	sessions: { type: [{date: String, startTime: String, endTime: String, participants: [ObjectId], numWeeks: Number }], default: [] },	//dates the class is offered, Number of People Signed up
  	tags: [String],						//tags
  	meta: {	type: {							//meta data
      favs: Number,					//number of favorites class has
  		thumbsUp: Number 				//number of thumbsup the class has
  	}, required: false }
});

classSchema.index({ name: 1, teacher: -1 });

module.exports = mongoose.model('Class', classSchema);
