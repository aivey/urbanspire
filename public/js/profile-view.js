(function(window, document, undefined) {
  var ProfileView = {};

  var $profileInfoTemplate = $('#profileinfo-template');
  var $classesTemplate = $('#classlist-template');

  var templates = {
    renderProfileInfo: Handlebars.compile($profileInfoTemplate.html());
    renderClasses: Handlebars.compile($classesTemplate.html());
  } 

  /* Renders the newsfeed into the given $newsfeed element. */
  ProfileView.renderProfileCard = function($newsfeed) {
    var $error = $('#error');

    PostModel.loadAll(function(error, posts) {
      if(error) { //display error
        $error.html("Error loading posts");
      } else { //render all the posts
        posts.forEach(function(post) {
          ProfileView.renderPost($newsfeed, post, false);
        });
      }
    });

    $newsfeed.imagesLoaded(function(){ $newsfeed.masonry({
      columnWidth:'.post',
      itemSelector:'.post' });
    });
  };

  /* Given post information, renders a post element into $newsfeed. */
  ProfileView.renderClasses = function($newsfeed, post, updateMasonry) {
    // TODO
    var $post = $(renderFeedPost(post));
    $newsfeed.prepend($post);

    var $error = $('.error'); //error div

    $post.bind('click', function(event) {
      event.preventDefault();

      //traverse up the element that was clicked, until it is either the remove, post, or upvote element
      while(event.target.className !== "post" && event.target.className !== "remove" && event.target.className !== "upvote") {
        event.target = event.target.parentElement;
      }

      //if the remove button was clicked
      if(event.target.className === "remove") {
        PostModel.remove(post._id, function(error) {
          if(error) { //display error
            $error.html("Could not remove post");
          } else { //reload page
            $newsfeed.masonry('remove', $post);
            $newsfeed.masonry();
          }
        });
      } 
      // If the upvote button was clicked
      else if(event.target.className === "upvote") {
        PostModel.upvote(post._id, function(error, post) {
          if(error) { //display error in the div
            $error.html("Could not upvote post");
          } else { //update the count in the upvote div
            var $upvoteCountSpan = $post.find('.upvote-count');
            var newCount = parseInt($upvoteCountSpan.html()) + 1;
            $upvoteCountSpan.html('' + newCount); 
          }
        });
      }
    });

    if (updateMasonry) {
      $newsfeed.imagesLoaded(function() {
        $newsfeed.masonry('prepended', $post);
      });
    }
  };

  window.ProfileView = ProfileView;
})(this, this.document);
