var menuItem = document.getElementById('teachMenu');
menuItem.classList.add('active');
menuItem.classList.add('orange');


var i = 0;
var original = document.getElementById('duplicater');
var beforeElem = document.getElementById('add_button_div');

function duplicate() {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "duplicater" + ++i;
    // or clone.id = ""; if the divs don't need an ID
    original.parentNode.insertBefore(clone, beforeElem);
}

 function submit(){
    var continent = document.getElementById('continent_dropdown');
    var country = document.getElementById('country_dropdown');
    var classActivity = document.getElementById('class_activity_textbox');
    var classTitle = document.getElementById('class_title_textbox');
    var classDescription = document.getElementById('class_description_textbox');
    var address = document.getElementById('pac-input');
    var photo = document.getElementById('file_input').files[0];
    // has bug with multiple time slots 
    var date = document.getElementById('date');
    var fromTime = document.getElementById('from_time_dropdown');
    var fromTimeAMPM = document.getElementById('from_time_ampm_dropdown');
    var toTime = document.getElementById('to_time_dropdown');
    var toTimeAMPM = document.getElementById('to_time_ampm_dropdown');
    alert(continent.value);
    //alert(continent, country, classActivity, classTitle, classDescription, address, date, fromTime, fromTimeAMPM, toTime, toTimeAMPM);
}

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('my_map'), {
    center: {lat: -33.8688, lng: 151.2195},
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