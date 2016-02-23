var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var culturesSchema = mongoose.Schema({
  name: { type: String, required: true, index: { unique: true }},           //name of the culture
  type: Number,           //0 for city, 1 for country, 2 for continent
  city: String,           //city that the culture is from
  num: Number,
  country: String,          //country that the culture is from
  continent: String           //continent that the culture is from
});

module.exports = mongoose.model('Culture', culturesSchema);
