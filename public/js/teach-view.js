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
    case "1":
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
      sessions.push({ "date": date.value, "startTime": "" + fromTime.value + " " +  fromTimeAMPM.value, "endTime": "" + toTime.value + " " + toTimeAMPM.value, "participants": []});
    }
    /// DO ERROR CHECKING BEFORE ADDING CLASS!!!
    
    console.log(sessions);

    var classs = {
      "classname": classTitle.value,
      "blurb": classDescription.value,
      "image": photo,
      "locationString": address.value,
      "cultureCity": null,
      "cultureCountry": country.value,
      "cultureContinent": continent.value,
      "activityType": classActivity.value,
      "group": Number(classSetting.value) === 1 ? true : false,
      "numberOfSpots": classSizeLimit.value,
      "feed": Number(fee.value[0]) === 0 ? false : true,
      "fee": fee.value,
      "sessions": sessions
    };

    console.log(classs);

    ClassModel.add(classs, function(error, addedClass) {
      if (error) {
        //DO STUFF WITH DISPLAYING ERRORS
      } else {
        //document.getElementById("confirm_box").style.display = "block";
        //window.href.location = "/my_teachings";
      }
    });

    // document.getElementById("confirm_box").style.display = "block";
    // document.getElementById("continent_dropdown").disabled=true;
    // document.getElementById("class_activity_dropdown").disabled=true;
    // document.getElementById("class_setting_dropdown").disabled=true;
    // document.getElementById("class_size_textbox").disabled=true;
    // document.getElementById("class_title_textbox").disabled=true;
    // document.getElementById("class_description_textbox").disabled=true;
    // document.getElementById("pac-input").disabled=true;
    // document.getElementById("file_input").disabled=true;

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
          classes: classes.slice(0,4),
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

$('.ui.form')
  .form({
    fields: {
      continent_dropdown: {
        identifier: 'continent_dropdown',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a continent'
          }
        ]
      },
      country_dropdown: {
        identifier: 'country_dropdown',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a country'
          }
        ]
      },
      class_activity_dropdown: {
        identifier: 'class_activity_dropdown',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a class activity'
          }
        ]
      },
      class_setting_dropdown: {
        identifier: 'class_setting_dropdown',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a class setting'
          }
        ]
      },
      class_title_textbox: {
        identifier: 'class_title_textbox',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter class title'
          }
        ]
      },
      class_description_textbox: {
        identifier: 'class_description_textbox',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter class description'
          }
        ]
      },
      location: {
        identifier: 'pac-input',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter an address'
          }
        ]
      },
      class_fee_textbox: {
        identifier: 'class_fee_textbox',
        rules: [
          {
            type   : 'integer[0..1000]',
            prompt : 'Please enter an integer value for class fee'
          }
        ]
      },
      timeSlotDate: {
        identifier: 'timeSlotDate',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a date'
          }
        ]
      }
    }
  })
;
