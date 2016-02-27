function submit() {

	var review = document.getElementById('review_content');
	var stars = document.getElementsByClassName('rating')[0];
	$('.rating').rating('getrating');
	alert(review.value);
	var params = {
		"userId": encodeURIComponent("56c54b8e65d9d4db85dc62a0"),
		"classId": encodeURIComponent(classdata._id),
		"stars": encodeURIComponent(stars.rating('getrating')),
		"message": encodeURIComponent(review.value)
	}
	alert(params);
	// ReviewModel.addReview(params, function(error, review) {
	// 	if(error) {
	// 		//do stuff
	// 	} else {
	// 		window.url.href = '/my_classes';
	// 	}
	// });
}