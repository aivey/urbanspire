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
  SearchModel.search = function(radius, culture, classType, callback) {
    var searchRequest = new XMLHttpRequest();
    searchRequest.addEventListener("load", function() {
      if (searchRequest.status !== STATUS_OK) {
        callback(this.status);
      } else {
        var response = JSON.parse(searchRequest.responseText);
        callback(null, response);
      }
    });

    var searchParams = "?";
    searchParams += "culture=" + encodeURIComponent(culture);
    searchParams += "&radius=" + encodeURIComponent(radius);
    searchParams += "&classType=" + encodeURIComponent(classType);
    searchRequest.open('GET', CLASS_URL + searchParams);
    searchRequest.send();
  };

  window.SearchModel = SearchModel;
})(this, this.document);
