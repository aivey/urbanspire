var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var reviewSchema = mongoose.Schema({
  userId: { type: ObjectId, required: true },           //id of user who created review
  userName: String,
  userImage: String,
  classId: { type: ObjectId, required: true },          //id of class the review is for
  message: { type: String, required: true },
  stars: { type: Number, required: false},              //text of review
  datePosted: { type: Date, default: Date.now }      //Date the review was posted
});

reviewSchema.index({ userId: 1, classId: -1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
