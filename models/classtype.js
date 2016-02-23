var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var classTypesSchema = mongoose.Schema({
  type: { type: String, required: true, index: { unique: true }} //type of class. ex. Dancing, Art, etc.
});

module.exports = mongoose.model('ClassType', classTypesSchema);
