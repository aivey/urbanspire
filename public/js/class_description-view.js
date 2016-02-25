(function(window, document, undefined) {

	var ClassDescriptionView = {};

	function class_confirm(){
		document.getElementById("confirm_box").style.display = "block";
		//document.getElementById("class_container").style.opacity = 0.4;
	}


    window.ClassDescriptionView = ClassDescriptionView;
})(this, this.document);


function class_confirm(){
	document.getElementById("confirm_box").style.display = "block";
	document.getElementById("class_time_dropdown").disabled=true;
	//document.getElementById("class_container").style.opacity = 0.4;
}

//google.maps.event.addDomListener(window, 'load', initialize);