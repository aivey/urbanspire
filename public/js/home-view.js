var menuItem = document.getElementById('homeMenu');
menuItem.classList.add('active');
menuItem.classList.add('orange');


$(document).ready(function(){
	var icon_1 = document.getElementsByClassName("large_icon icon_1");
	var icon_2 = document.getElementsByClassName("large_icon icon_2");
	var icon_3 = document.getElementsByClassName("large_icon icon_3");

	var title_1 = document.getElementsByClassName("title_1");
	var title_2 = document.getElementsByClassName("title_2");
	var title_3 = document.getElementsByClassName("title_3");

	var text_1 = document.getElementsByClassName("text_1");
	var text_2 = document.getElementsByClassName("text_2");
	var text_3 = document.getElementsByClassName("text_3");

	var local_1 = "As a local, we invite you to learn from the classes taught by newcomers. You can browse the catalog of available classes taught by your fellow neighbors and can search by cultural origin, activity, and/or distance.";
	var local_2 = "Choose a class that interests you and that fits with your schedule and sign up.";
	var local_3 = "Meet your neighbor(s) and learn about their culture!";

	var newcomer_1 = "As a newcomer, you have the option of teaching or learning.";
	var newcomer_2 = "We encourage newcomers to teach something that they know and love from their home culture.";
	var newcomer_3 =  "Newcomers may also take classes to learn about other cultures";

	var local_button = document.getElementById("local_button");
   	var newcomer_button = document.getElementById("newcomer_button");
   	var numbering = document.getElementById("work_labels numbering");
   	var or_divider = document.getElementById("or_divider");
   	var small_description = document.getElementsByClassName("small_description");

   	// Default text
	$(title_1).html("<u>Determine</u>");
	$(title_2).html("<u>Teach</u>");
	$(title_3).html("<u>Learn</u>");
	$(text_1).html(newcomer_1);
	$(text_2).html(newcomer_2);
	$(text_3).html(newcomer_3);

    $("#local_button").click(function(){
    	// Changing button color
        $(local_button).addClass("active orange");
       	$(newcomer_button).removeClass("active orange");

        // Changing numbering and images
       	$(numbering).addClass("visible");
		$(numbering).removeClass("hidden");
		$(icon_1).attr("src", "images/search_icon.png");
		$(icon_2).attr("src", "images/select_icon.png");
		$(icon_3).attr("src", "images/learn_icon.png");

        // Hiding divider
       	$(or_divider).addClass("hidden");
		$(or_divider).html("");

 		$(title_1).html("<u>Browse</u>");
 		$(title_2).html("<u>Choose</u>");
 		$(title_3).html("<u>Learn</u>");
 		$(text_1).html(local_1);
 		$(text_2).html(local_2);
 		$(text_3).html(local_3);

 		$(small_description).hide();
    });


     $("#newcomer_button").click(function(){
     	// Changing button color
        $(newcomer_button).addClass("active orange");
        $(local_button).removeClass("active orange");

        // Changing numbering and images
       	$(numbering).addClass("hidden");
        $(numbering).removeClass("visible");

        $(icon_1).attr("src", "images/help_icon.png");
       	$(icon_2).attr("src", "images/learn_icon.png");
       	$(icon_3).attr("src", "images/teach_icon.png");

        // Showing divider
       	$(or_divider).removeClass("hidden");
		$(or_divider).html("Or");

 		$(title_1).html("<u>Determine</u>");
 		$(title_2).html("<u>Teach</u>");
 		$(title_3).html("<u>Learn</u>");
 		$(text_1).html(newcomer_1);
 		$(text_2).html(newcomer_2);
 		$(text_3).html(newcomer_3);

 		$(small_description).show();

    });
});