(function(window, document, undefined) {
  var ClassModel = {};

  var CLASS_URL = '/class';
  var STATUS_OK = 200;

  
  ClassModel.add = function(classs, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', CLASS_URL + '/add', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send(JSON.stringify(classs));
  }

  ClassModel.getClassPageById = function(id, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', CLASS_URL + '?id=' + id, true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send();
  }

  ClassModel.addUserToClass = function(classId, index, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', CLASS_URL + '/addParticipant', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send(JSON.stringify({ "classId": classId, "sessionIndex": index }));
  }


  /**
   * Loads API search results for a given query.
   *
   * Calls: callback(error, results)
   *  error -- the error that occurred or NULL if no error occurred
   *  results -- an array of search results
   */
  ClassModel.loadRecommendations = function(callback) {
    var searchRequest = new XMLHttpRequest();
    searchRequest.addEventListener("load", function() {
      if (searchRequest.status !== STATUS_OK) {
        callback(this.status);
      } else {
        var response = JSON.parse(searchRequest.responseText);
        callback(null, response);
      }
    });

    searchRequest.open('GET', CLASS_URL + '/recommendations', true);
    searchRequest.send();
  };

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
        console.log(searchRequest.responseText);
        var response = JSON.parse(searchRequest.responseText);
        callback(null, response);
      }
    });
    console.log(parameters);

    var searchParamString = "";
    for (var index in parameters){
      params = parameters[index];
      console.log(params);
      searchParamString += "&" + params.name + "=" + encodeURIComponent(params.val);
    }
    searchParamString = searchParamString.substr(0,0) + '?' + searchParamString.substr(0+1);
    searchRequest.open('GET', CLASS_URL + '/search' + searchParamString, true);
    searchRequest.send();
  };

  ClassModel.findUpcomingClasses = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', CLASS_URL + '/upcomingClasses', true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send();
  }

  ClassModel.findUpcomingTeachings = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', CLASS_URL + '/upcomingTeachings', true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send();
  }

  ClassModel.findPastClasses = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', CLASS_URL + '/pastClasses', true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send();
  }

  ClassModel.findPastTeachings = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', CLASS_URL + '/pastTeachings', true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send();
  }

  ClassModel.findPastTeachingsById = function(id, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', CLASS_URL + '/pastTeachingsById?id=' + id, true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        callback(null, JSON.parse(this.responseText));
      }
    });
    request.send();
  }

  ClassModel.findUpcomingTeachingsById = function(id, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', CLASS_URL + '/upcomingTeachingsById?id=' + id, true);
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
