(function(window, document, undefined) {
  var ReviewModel = {};

  var REVIEW_URL= '/review';
  var STATUS_OK = 200;

  /**
   * Loads information on the given user from the server.
   *
   * Calls: callback(user, error)
   *  error -- the error that occurred or null if no error occurred
   *  results -- an array of newsfeed posts
   */
  ReviewModel.addReview = function(params, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', REVIEW_URL + '/add', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send(params);
  };

  /**
   * Loads information on the given user from the server.
   *
   * Calls: callback(user, error)
   *  error -- the error that occurred or null if no error occurred
   *  results -- an array of newsfeed posts
   */
  ReviewModel.getReviews = function(classId, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', REVIEW_URL + '?id=' + classId, true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        console.log(JSON.parse(this.responseText));
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send();
  };

  window.ReviewModel = ReviewModel;
})(this, this.document);
