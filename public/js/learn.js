(function(window, document, undefined) {

var selecter = document.getElementById('selecter');
var searchBtn = document.getElementById('search');
var resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', function(event){
	var html;
	if(selecter.value == 2) {
		html = new EJS({url: '/european'}).render({});
		//resultsDiv.innerHtml = html;
	} else if (selecter.value == 3) {
		html = new EJS({url: '/african'}).render({});
	}
	resultsDiv.innerHTML = html;
});

})(this, this.document);
