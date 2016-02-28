var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
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
  	signedUp: { type: [ObjectId], default: []},				//id of the class they are currently signed up to take
  	teaching: { type: [ObjectId], default: []}, 				//id of the classes they are signed up to teach
  	took: { type: [ObjectId], default: []},					//id of the classes they already took
  	taught: { type: [ObjectId], default: []},					//id of past classes they taught
  	favs: { type: [ObjectId], default: []},					//ids of classes they have favorited
  	newcomer: Boolean,					//true if you consider yourself a newcomer, false if local
    teacher: Boolean,           //whether you are registered to teach
    connections: { type: Number, default: 0 },        //number of ppl they have connected with
    connectionsList: { type: [ObjectId], default: [] },
    facebook: {
    	id: String,
    	token: String,
    	email: String,
    	name: String
    }
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
