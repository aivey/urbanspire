(function(window, document, undefined) {
  var UserProfileView = {};

  //console.log(window);
  //var $profileInfoTemplate = $('#profileinfo-template');
  var $profileInfoTemplate = $('#profile-template');
  var $upcomingTeachingsTemplate = $('#upcomingteachings-template');
  var $pastTeachingsTemplate = $('#pastteachings-template');

  var userId = $('#userid').val();
  console.log(userIdString);

  var templates = {
    renderProfileInfo: Handlebars.compile($profileInfoTemplate.html()),
    renderUpcomingTeachings: Handlebars.compile($upcomingTeachingsTemplate.html()),
    renderPastTeachings: Handlebars.compile($pastTeachingsTemplate.html())
  } 

  /* Renders the newsfeed into the given $newsfeed element. */
  UserProfileView.renderProfileCard = function($profile) {
    var message;
    var err = false;
    UserModel.loadProfile(function(error, profileInfo) {
      if(error) { //display error
        err = true;
        message = "Sorry, we are having trouble loading data. Refresh the page to try again!";
        //TO DO FIX WHAT HAPPENS ON ERROR
      } else { //render all the posts
        $profile.html(templates.renderProfileInfo({
          viewing: true,
          profile: profileInfo,
          error: err,
          message: message
        }));
      }
    });
  };

  /* Given post information, renders a post element into $newsfeed. */
  UserProfileView.renderClasses = function() {
    // TODO
    var $upcomingTeachings = $('#teachingTab');
    var $pastTeachings = $('#taughtTab');

    ClassModel.findUpcomingTeachingsById(userIdString, function(error, classes) {
      var message;
      var err = false;
      console.log('upcoming teachings');
      console.log(classes);
      if(error) {
        message = "Sorry, we are having issues right now loading your classes. Please refresh the page to try again."
        err = true;
        classes = null;
      }
      $upcomingTeachings.html(templates.renderUpcomingTeachings({
        viewing: true,
        classes: classes,
        error: err,
        message: message
      }));
    });

    ClassModel.findPastTeachingsById(userIdString, function(error, classes) {
      var message;
      var err = false;
      console.log('past teachings');
      console.log(classes);
      if(error) {
        message = "Sorry, we are having issues right now loading your classes. Please refresh the page to try again."
        err = true;
        classes = null;
      } 
      $pastTeachings.html(templates.renderPastTeachings({
        viewing: true,
        classes: classes,
        error: err,
        message: message
      }));
    });
  };

  $(document).ready(function() {
    UserProfileView.renderClasses();
  });

  window.UserProfileView = UserProfileView;
})(this, this.document);
