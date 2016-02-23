var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var locationsSchema = mongoose.Schema({
  name: { type: String, required: true, index: true },                                          //name of place
  address: { type: {street: String, city: String, cc: String}, required: true, index: true }, //address
  loc: { type: [Number], index: '2d' },                //latitude and longitude of location
  availableSpaces: [{room: String, timesAvailable: [Date], timesBooked: [Date], capacity: Number}], //array of available rooms in the space, the times it is available, and room capacity
  fee: {type: Number, default: -1 }                     //0 if no fee to use space, otherwise some value
});

locationsSchema.index({ name: 1, location: -1 }, { unique: true });


module.exports = mongoose.model('Location', locationsSchema);
