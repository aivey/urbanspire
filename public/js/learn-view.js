// function confirm(){
// 	document.getElementById("confirm_box").style.display = "block";
// 	document.getElementById("class_des_wrapper").style.background = rgba(242, 113, 28, 1);
// 	document.getElementById("class_container").style.display = "none";
// 	$(document).off('scroll.scrollLock');
// }



// function close(){
// 	document.getElementById("class_des_wrapper").style.display = "none";
// 	$(document).off('scroll.scrollLock');
// }

(function(window, document, undefined) {

	var menuItem = document.getElementById('learnMenu');
	menuItem.classList.add('active');
	menuItem.classList.add('orange');

	var LearnView = {};

	var $searchResultsTemplate = $('#searchresults-template');

	var templates = {
	    renderResults: Handlebars.compile($searchResultsTemplate.html())
	} 

	var selecter = document.getElementById('selecter');
	var searchBtn = document.getElementById('search');
	var resultsDiv = document.getElementById('results');

	LearnView.browseclass = function(id){
		// link to classes page and add class id to url 
		var url = 'class';
		url += '?id=' + id;
		window.location.href = url;
	}

	LearnView.setup = function($searchresults) {
		LearnView.renderRecommendations($searchresults);

		var cultureSelector = document.getElementById('cultureSelector');
		var activitySelector = document.getElementById('activitySelector');
		var radiusSelector = document.getElementById('radiusSelector');
		var searchBtn = document.getElementById('search');

		searchBtn.addEventListener('click', function(event) {
			var searchparams = [
				{ name: 'culture', val: cultureSelector.value },
				{ name: 'activity', val: activitySelector.value },
				{ name: 'radius', val: radiusSelector.value }
			];

			ClassModel.search(searchparams, function(error, classes) {
				var err = false;
				if(error) {
					err = true;
					classes = null;
				}
				$searchresults.html(templates.renderResults({
					viewing: true,
					classes: classes,
					error: err
				}));
			});	
		});
	}

	LearnView.renderRecommendations = function($searchresults) {
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
// 	var html;
// 	if(selecter.value == 2) {
// 		html = new EJS({url: '/european'}).render({});
// 		//resultsDiv.innerHtml = html;
// 	} else if (selecter.value == 3) {
// 		html = new EJS({url: '/african'}).render({});
// 	}
// 	resultsDiv.innerHTML = html;
// });

	$(document).ready(function() {
		// $('.ui.dropdown').each(function(index) {
		// 	this.dropdown();
		// });
	    LearnView.setup($('#searchResults'));
  	});

  	window.LearnView = LearnView;
})(this, this.document);

