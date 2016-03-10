(function(window, document, undefined) {

	var ClassDescriptionView = {};
	

	function class_confirm(){
		if(user) {
			ClassModel.addUserToClass(classs._id, sessionDropdown.value, function(error, classs) {
				document.getElementById("confirm_box").style.display = "block";
			});
		} else {
			strtBlackout();
		}
	}


    window.ClassDescriptionView = ClassDescriptionView;
})(this, this.document);

var sessionDropdown = document.getElementById('class_time_dropdown');

function class_confirm(){
	if(user) {
		ClassModel.addUserToClass(classs._id, sessionDropdown.value, function(error, classs) {
			// document.getElementById("confirm_box").style.display = "block";
			document.getElementById("confirm_box").style.display = "block";
			document.getElementById("class_time_dropdown").disabled=true;
		});
	} else {
		strtBlackout();
	}
	

	// get the time selected + userID + classID 
}

//google.maps.event.addDomListener(window, 'load', initialize);