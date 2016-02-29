function submit() {

	var review = document.getElementById('review_content');
	var params = "classId=" + classId + "&stars=" + $('.ui.rating').rating('get rating') + "&message=" + review.value;
	ReviewModel.addReview(encodeURI(params), function(error, review) {
		if(error) {
			//do stuff
		} else {
			//CONFIRMATION SCREEN
			window.location.href = '/my_classes';
		}
	});
}