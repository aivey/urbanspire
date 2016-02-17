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
  UserModel.loadProfile = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', USERS_URL + '/profile', true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        //callback(null, JSON.parse(this.responseText));
        callback(null, {
          name: {
            first: "Matt",
            last: "Tiempo"
          },
          email: "matt.tiempo@gmail.com",
          description: "Hi, I'm Matt! I recently immigrated from Germany and now live in the San Francisco area. I'm excited to share my German culture and learn from others!",
          connections: 22,
          image: "/images/matthew.png"
        });
      }
    });
    request.send();
  };

  /**
   * Loads information on the given user from the server.
   *
   * Calls: callback(user, error)
   *  error -- the error that occurred or null if no error occurred
   *  results -- an array of newsfeed posts
   */
  UserModel.loginUser = function(user, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', USERS_URL + '/login', true);
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
    request.open('POST', USERS_URL + '/signup', true);
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

  /* Adds the given post to the list of posts. The post must *not* have
   * an _id associated with it.
   *
   * Calls: callback(error, post)
   *  error -- the error that occurred or null if no error occurred
   *  post -- the post added, with an _id attribute
   */
  UserModel.logoutUser = function(callback) {
    var request = new XMLHttpRequest();
    request.open('POST', USERS_URL + '/logout', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send(JSON.stringify());
  };


  /* Adds the given post to the list of posts. The post must *not* have
   * an _id associated with it.
   *
   * Calls: callback(error, post)
   *  error -- the error that occurred or null if no error occurred
   *  post -- the post added, with an _id attribute
   */
  UserModel.updateProfile = function(user, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', USERS_URL + '/update', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send(JSON.stringify(user));
  }

  window.UserModel = UserModel;
})(this, this.document);
