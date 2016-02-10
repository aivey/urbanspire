(function(window, document, undefined) {

  /* Handlebars equal comparison to help render templates. */
  Handlebars.registerHelper('equal', function(left, right, options) {
    if (arguments.length < 3) {
      throw new Error("Handlebars equal helper needs 2 parameters");
    }

    if (left != right) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  Handlebars.registerPartial('leanClassesCard', 
    '<div class="ui centered card">' + 
      '<div class="image">' + 
        '<img class = "square" src="{ class.image }">' +
      '</div>' +
      '<div class="content">' +
        '<a class="header">Peruvian Weaving</a>' +
      '</div></div>');

})(this, this.document);
