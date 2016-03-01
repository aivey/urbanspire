
(function(window, document, undefined) {
  var MyTeachingsView = {};

  //var $profileInfoTemplate = $('#profileinfo-template');
  var $profileInfoTemplate = $('#profile-template');
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

  console.log(user);

  /* Renders the newsfeed into the given $newsfeed element. */
  MyTeachingsView.renderProfileCard = function($profile) {
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
  MyTeachingsView.renderClasses = function() {
    // TODO
    var $upcomingClasses = $('#learningTab');
    var $upcomingTeachings = $('#teachingTab');
    var $pastClasses = $('#pastClassesTab');
    var $pastTeachings = $('#taughtTab');

    ClassModel.findUpcomingClasses(function(error, classes) {
      var message;
      var err = false;
      if(error) {
        message = "Sorry, we are having issues right now loading your classes. Please refresh the page to try again."
        err = true;
        classes = null;
      }
      console.log(classes);
      $upcomingClasses.html(templates.renderUpcomingClasses({
        viewing: true,
        classes: classes,
        teacher: user,
        error: err,
        message: message
      }));
    });

    ClassModel.findUpcomingTeachings(function(error, classes) {
      var message;
      var err = false;
      if(error) {
        message = "Sorry, we are having issues right now loading your classes. Please refresh the page to try again."
        err = true;
        classes = null;
      }
      $upcomingTeachings.html(templates.renderUpcomingTeachings({
        viewing: true,
        classes: classes,
        teacher: user,
        error: err,
        message: message
      }));
    });

    ClassModel.findPastClasses(function(error, classes) {
      var message;
      var err = false;
      if(error) {
        message = "Sorry, we are having issues right now loading your classes. Please refresh the page to try again."
        err = true;
        classes = null;
      }
      $pastClasses.html(templates.renderPastClasses({
        viewing: true,
        classes: classes,
        teacher: user,
        error: err,
        message: message
      }));
    });

    ClassModel.findPastTeachings(function(error, classes) {
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
        teacher: user,
        error: err,
        message: message
      }));
    });
  };

  $(document).ready(function() {
    // MyTeachingsView.renderProfile($('#classes_container'));
    MyTeachingsView.renderClasses();
  });

  window.MyTeachingsView = MyTeachingsView;
})(this, this.document);