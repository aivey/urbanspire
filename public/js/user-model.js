(function(window, document, undefined) {
  var UserModel = {};

  var USERS_URL= '/user';
  var STATUS_OK = 200;

  /**
   * Loads information on the given user from the server.
   *
   * Calls: callback(user, error)
   *  error -- the error that occurred or null if no error occurred
   *  results -- an array of newsfeed posts
   */
  UserModel.loginUser = function(user, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', POSTS_URL + '/login', true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send();
  };

  /* Adds the given post to the list of posts. The post must *not* have
   * an _id associated with it.
   *
   * Calls: callback(error, post)
   *  error -- the error that occurred or null if no error occurred
   *  post -- the post added, with an _id attribute
   */
  UserModel.signupUser = function(user, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', POSTS_URL + '/signup', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send(JSON.stringify(user));
  };

  // /* Removes the post with the given id.
  //  *
  //  * Calls: callback(error)
  //  *  error -- the error that occurred or null if no error occurred
  //  */
  // PostModel.remove = function(id, callback) {
  //   var request = new XMLHttpRequest();
  //   request.open('POST', POSTS_URL + '/remove', true);
  //   request.setRequestHeader('Content-type', 'application/json');
  //   request.addEventListener("load", function () {
  //     if(this.status !== STATUS_OK) {
  //       callback(this.status);
  //     } else {
  //       callback(null);
  //     }
  //   });
  //   request.send(JSON.stringify({ _id: id}));
  // };

  // /* Upvotes the post with the given id.
  //  *
  //  * Calls: callback(error, post)
  //  *  error -- the error that occurred or null if no error occurred
  //  *  post -- the updated post model
  //  */
  // PostModel.upvote = function(id, callback) {
  //   var request = new XMLHttpRequest();
  //   request.open('POST', POSTS_URL + '/upvote', true);
  //   request.setRequestHeader('Content-type', 'application/json');
  //   request.addEventListener("load", function () {
  //     if(this.status !== STATUS_OK) {
  //       callback(this.status);
  //     } else {
  //       callback(null, JSON.parse(this.responseText));
  //     }
  //   });
  //   request.send(JSON.stringify({ _id: id}));
  // };

  window.UserModel = UserModel;
})(this, this.document);
