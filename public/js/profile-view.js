(function(window, document, undefined) {
  var ProfileView = {};

  var menuItem = document.getElementById('loginMenu');
  menuItem.classList.add('active');
  menuItem.classList.add('orange');


  var $profileInfoTemplate = $('#profileinfo-template');
  var $upcomingClassesTemplate = $('#upcomingclasses-template');
  var $upcomingTeachingsTemplate = $('#upcomingteachings-template');
  var $pastClassesTemplate = $('#pastclasses-template');
  var $pastTeachingsTemplate = $('#pastteachings-template');

  var templates = {
    renderProfileInfo: Handlebars.compile($profileInfoTemplate.html()),
    renderUpcomingClasses: Handlebars.compile($upcomingClassesTemplate.html()),
    renderUpcomingTeachings: Handlebars.compile($upcomingTeachingsTemplate.html()),
    renderPastClasses: Handlebars.compile($pastClassesTemplate.html()),
    renderPastTeachings: Handlebars.compile($pastTeachingsTemplate.html())
  } 

  /* Renders the newsfeed into the given $newsfeed element. */
  ProfileView.renderProfileCard = function($profile) {
    var message;

    UserModel.loadProfile(function(error, profileInfo) {
      if(error) { //display error
        error = true;
        message = "Sorry, we are having trouble loading data. Refresh the page to try again!";
        //TO DO FIX WHAT HAPPENS ON ERROR
      } else { //render all the posts
        $profile.html(templates.renderProfileInfo({
          viewing: true,
          profile: profileInfo,
          error: false,
          message: message
        }));
      }
    });
  };

  /* Given post information, renders a post element into $newsfeed. */
  ProfileView.renderClasses = function() {
    // TODO
    var $upcomingClasses = $('#learningTab');
    var $upcomingTeachings = $('#teachingTab');
    var $pastClasses = $('#pastClassesTab');
    var $pastTeachings = $('#taughtTab');

    ClassModel.findUpcomingClasses(function(error, classes) {
      var message;
      var error = false;
      if(error) {
        message = "Sorry, we are having issues right now loading your classes. Please refresh the page to try again."
        error = true;
        classes = null;
      }
      $upcomingClasses.html(templates.renderUpcomingClasses({
        viewing: true,
        classes: classes,
        error: error,
        message: message
      }));
    });

    ClassModel.findUpcomingTeachings(function(error, classes) {
      var message;
      var error = false;
      if(error) {
        message = "Sorry, we are having issues right now loading your classes. Please refresh the page to try again."
        error = true;
        classes = null;
      }
      $upcomingTeachings.html(templates.renderUpcomingClasses({
        viewing: true,
        classes: classes,
        error: error,
        message: message
      }));
    });

    ClassModel.findPastClasses(function(error, classes) {
      var message;
      var error = false;
      if(error) {
        message = "Sorry, we are having issues right now loading your classes. Please refresh the page to try again."
        error = true;
        classes = null;
      }
      $pastClasses.html(templates.renderUpcomingClasses({
        viewing: true,
        classes: classes,
        error: error,
        message: message
      }));
    });

    ClassModel.findPastTeachings(function(error, classes) {
      var message;
      var error = false;
      if(error) {
        message = "Sorry, we are having issues right now loading your classes. Please refresh the page to try again."
        error = true;
        classes = null;
      } 
      $pastTeachings.html(templates.renderUpcomingClasses({
        viewing: true,
        classes: classes,
        error: error,
        message: message
      }));
    });
  };

  $(document).ready(function() {
    ProfileView.renderProfileCard($('#profile'));
    ProfileView.renderClasses();
  });

  window.ProfileView = ProfileView;
})(this, this.document);
