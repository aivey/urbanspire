(function(window, document, undefined) {

	var ClassDescriptionView = {};

	function class_confirm(){
		document.getElementById("confirm_box").style.display = "block";
	}


    window.ClassDescriptionView = ClassDescriptionView;
})(this, this.document);


function class_confirm(){
	document.getElementById("confirm_box").style.display = "block";
	document.getElementById("class_time_dropdown").disabled=true;
	

	// get the time selected + userID + classID 
}

//google.maps.event.addDomListener(window, 'load', initialize);