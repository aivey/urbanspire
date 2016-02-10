(function(window, document, undefined) {
  var ClassModel = {};

  var CLASS_URL = '/class';
  var STATUS_OK = 200;

  /**
   * Loads API search results for a given query.
   *
   * Calls: callback(error, results)
   *  error -- the error that occurred or NULL if no error occurred
   *  results -- an array of search results
   */
  ClassModel.search = function(parameters, callback) {
    var searchRequest = new XMLHttpRequest();
    searchRequest.addEventListener("load", function() {
      if (searchRequest.status !== STATUS_OK) {
        callback(this.status);
      } else {
        var response = JSON.parse(searchRequest.responseText);
        callback(null, response);
      }
    });

    var searchParamString = "";
    for (params in parameters){
      searchParamString.append("&" + params.name + "=" + encodeURIComponent(params.val));
    }
    searchParamString[0] = '?';
    searchRequest.open('GET', CLASS_URL + searchParamString, true);
    searchRequest.send();
  };

  ClassModel.findUsersClasses = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', CLASS_URL + / 'userClasses', true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send();
  }

  window.ClassModel = ClassModel;
})(this, this.document);
