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

  ClassModel.findUpcomingClasses = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', CLASS_URL + '/upcomingClasses', true);
    request.addEventListener("load", function () {
      if(this.status !== STATUS_OK) {
        callback(this.status);
      } else {
        //callback(null, JSON.parse(this.responseText));
        console.log("fake data");
        callback(null, 
          [
            { 
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            },
          ]
        );
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
        //callback(null, JSON.parse(this.responseText));
        console.log("fake data");
        callback(null, 
          [
            { 
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            },
          ]
        );
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
        //callback(null, JSON.parse(this.responseText));
        console.log("fake data");
        callback(null, 
          [
            { 
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            },
          ]
        );
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
        //callback(null, JSON.parse(this.responseText));
        console.log("fake data");
        callback(null, 
          [
            { 
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            },
            { 
              title: "Irish Dancing",
              photos: ["/images/irish_dance.png"],
              continent: "European",
              country: "Irish",
              type: "Dance",
              blurb: "Come learn how to dance like the Irish! Fun, upbeat class that will get your blood pumping.",
              teacher: {
                image: "/images/Margaret.png",
                name: {
                  first: "Margaret",
                  last: "Markin"
                },
                url: "/profile"
              }
            }, 
            { 
              title: "African Bowl Weaving",
              photos: ["/images/africa-art.jpg"],
              continent: "African",
              country: "Etheopian",
              type: "Art",
              blurb: "Learn the tradition of Etheopian bowl weaving. You'll make a colorful bowl to take home and show off!",
              teacher: {
                image: "/images/Nikhita.png",
                name: {
                  first: "Nikhita",
                  last: "Obeegadoo"
                },
                url: "/profile"
              }
            },,
          ]
        );
      }
    });
    request.send();
  }

  window.ClassModel = ClassModel;
})(this, this.document);
