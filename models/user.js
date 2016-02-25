var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var ObjectId = mongoose.Schema.ObjectId;

var userSchema = mongoose.Schema({
  	name: {
  		first: { type: String, required: true }, 
  		last: { type: String, required: true }
  	},
  	email: { type: String, required: true, unique: true },
  	phoneNumber: { type: String, default: "7024440356" },						//persons email
    num: Number, //REMOVE THIS LATER
    password: { type: String, required: false }, //CHANGE BACK TO TRUE
    description: String,
    image: { type: String, required: false, default: "images/default-profile.png" },
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

module.exports = mongoose.model('User', userSchema);
