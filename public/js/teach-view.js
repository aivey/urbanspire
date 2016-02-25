var menuItem = document.getElementById('teachMenu');
menuItem.classList.add('active');
menuItem.classList.add('orange');


var i = 0;
var original = document.getElementById('duplicater');
var beforeElem = document.getElementById('add_button_div');

window.onload = function() {
    console.log("Entered");
    var continent = localStorage.getItem(continent);
    if (continent !== null) $('#continent_dropdown').val(continent);
    var class_title = localStorage.getItem(class_title);
    if (class_title != null) $('#class_title_textbox').val(class_title);

    // ...
}

$(window).bind('beforeunload', function(){
    localStorage.setItem(continent, $('#continent_dropdown').val());
    console.log(continent);
    // localStorage.setItem(class_title, $('#class_title_textbox').val());
    // console.log("Entered 2");
    return 'test';
});

// window.onbeforeunload = function(event) {
//     console.log("Entered 1");
//     localStorage.setItem(continent, $('#continent_dropdown').val());
//     localStorage.setItem(class_title, $('#class_title_textbox').val());
//     //localStorage.setItem(phone, $('#inputPhone').val());
//     //localStorage.setItem(subject, $('#inputSubject').val());
//     //localStorage.setItem(detail, $('#inputDetail').val());
//     // ...
// }

$('#class_setting_dropdown').on('change',function(){
     var selection = $(this).val();
    switch(selection){
    case "group":
    $("#class_size").show()
   break;
    default:
    $("#class_size").hide()
    }
});

function duplicate() {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "duplicater" + ++i;
    // or clone.id = ""; if the divs don't need an ID
    original.parentNode.insertBefore(clone, beforeElem);
}

 function submit(){
    console.log("submit pressed");
    var continent = document.getElementById('continent_dropdown');
    var country = document.getElementById('country_dropdown');
    var classActivity = document.getElementById('class_activity_dropdown');
    var classSetting = document.getElementById('class_setting_dropdown');
    var classSizeLimit = document.getElementById('class_size_textbox');
    var classTitle = document.getElementById('class_title_textbox');
    var classDescription = document.getElementById('class_description_textbox');
    var address = document.getElementById('pac-input');
    var photo = document.getElementById('file_input').files[0];
    var fee = document.getElementById('class_fee_textbox');
    // has bug with multiple time slots 
    var sessions = [];
    var timeSlots = document.getElementsByClassName('timeSlot');
    for(var i = 0; i < timeSlots.length; i++) {
      var timeSlot = timeSlots[i];
      var date = timeSlot.getElementsByClassName('timeSlotDate')[0];
      var fromTime = timeSlot.getElementsByClassName('from_time_dropdown')[0];
      var fromTimeAMPM = timeSlot.getElementsByClassName('from_time_ampm_dropdown')[0];
      var toTime = timeSlot.getElementsByClassName('to_time_dropdown')[0];
      var toTimeAMPM = timeSlot.getElementsByClassName('to_time_ampm_dropdown')[0];
      sessions.push({ "date": encodeURIComponent(date.value), "startTime": "" + encodeURIComponent(fromTime.value) + " " +  encodeURIComponent(fromTimeAMPM.value), "endTime": "" + encodeURIComponent(toTime.value) + " " + encodeURIComponent(toTimeAMPM.value), "participants": []});
    }

    /// DO ERROR CHECKING BEFORE ADDING CLASS!!!
    
    console.log(sessions);

    var classs = {
      "name": encodeURIComponent(classTitle.value),
      "blurb": encodeURIComponent(classDescription.value),
      "teacher": "5",
      "image": encodeURIComponent(photo),
      "locationString": encodeURIComponent(address.value),
      "cultureCity": encodeURIComponent(null),
      "cultureCountry": encodeURIComponent(country.value),
      "cultureContinent": encodeURIComponent(continent.value),
      "activityType": encodeURIComponent(classActivity.value),
      "group": classSetting.value === "1" ? encodeURIComponent(true) : encodeURIComponent(false),
      "numberOfSpots": encodeURIComponent(classSizeLimit.value),
      "feed": fee.value[0] === "0" ? encodeURIComponent(false) : encodeURIComponent(true),
      "fee": encodeURIComponent(fee.value),
      "sessions": sessions
    };

    console.log(classs);

    ClassModel.add(classs, function(error, addedClass) {
      if (error) {
        //DO STUFF WITH DISPLAYING ERRORS
      } else {
        window.href.location = "/my_teachings";
      }
    });
    //alert(continent.value);
    //alert(continent, country, classActivity, classTitle, classDescription, address, date, fromTime, fromTimeAMPM, toTime, toTimeAMPM);

}

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('my_map'), {
    center: {lat: +37.4225, lng: -122.1653},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  // [END region_getplaces]
}

(function(window, document, undefined) {

  var TeachView = {};

  var $searchResultsTemplate = $('#searchresults-template');

  var templates = {
      renderResults: Handlebars.compile($searchResultsTemplate.html())
  } 

  //var selecter = document.getElementById('selecter');
  //var searchBtn = document.getElementById('search');
  //var resultsDiv = document.getElementById('results');

  TeachView.setup = function($searchresults) {
    //TeachView.renderRecommendations($searchresults);

    var cultureSelector = document.getElementById('cultureSelector');
    //var activitySelector = document.getElementById('activitySelector');
    //var radiusSelector = document.getElementById('radiusSelector');
    var searchBtn = document.getElementById('search');

    searchBtn.addEventListener('click', function(event) {
      var searchparams = [
        { name: 'culture', val: cultureSelector.value }
        //{ name: 'activity', val: activitySelector.value },
        //{ name: 'radius', val: radiusSelector.value }
      ];

      ClassModel.search(searchparams, function(error, classes) {
        var err = false;
        if(error) {
          err = true;
          classes = null;
        }
        $searchresults.html(templates.renderResults({
          viewing: true,
          classes: classes.slice(0,5),
          error: err
        }));
      }); 
    });
  }

  TeachView.renderRecommendations = function($searchresults) {
    ClassModel.loadRecommendations(function(error, classes) {
      var err = false;
      if(error) {
        err = true;
        classes = null;
      }
      console.log(classes);
      $searchresults.html(templates.renderResults({
        viewing: true,
        classes: classes,
        error: err
      }));
    });
  }

// searchBtn.addEventListener('click', function(event){
//  var html;
//  if(selecter.value == 2) {
//    html = new EJS({url: '/european'}).render({});
//    //resultsDiv.innerHtml = html;
//  } else if (selecter.value == 3) {
//    html = new EJS({url: '/african'}).render({});
//  }
//  resultsDiv.innerHTML = html;
// });

  $(document).ready(function() {
    // $('.ui.dropdown').each(function(index) {
    //  this.dropdown();
    // });
      TeachView.setup($('#searchResults'));
    });

    window.TeachView = TeachView;
})(this, this.document);
