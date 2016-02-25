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

  Handlebars.registerHelper("log", function(something) {
    console.log(something);
  });

  // Handlebars.registerHelper("ifempty", function(array, block) {
  //   if(array.length == 0) {
  //     return block(this);
  //   }
  // });

  Handlebars.registerPartial('profileClassesCard', 
    // '<div class="ui centered card">' + 
    '<div class="ui card">' +       
      '<div class="ui fluid image">' + 
        '<img class = "square" src="{{ photos.[0] }}">' +
      '</div>' +
      '<div class="content">' +
        '<a class="header">{{ title }}</a>' +
        '<div class="meta">' +
          '<span class="right floated time">2 days ago</span>' +
          '<span class="category">{{ continent }}, {{ country }} {{ type }}</span>' +
        '</div>' +
        '<div class="description">' +
          '{{ blurb }}' +
        '</div>' +
      '</div>' + 
      '<div class="extra content">' +
        '<div class="right floated author">' +
          '<img class="ui avatar image" src="{{ teacher.image }}"><a href="{{ teacher.url }}">{{ teacher.name.first }}' +
        '</div>' +
      '</div>' +
    '</div>');

  Handlebars.registerPartial('recClassesCard', 
    // '<div class="ui centered card">' + 
    '<div class="ui card">' + 
      '<div class="content">' +
        '<a class="header">{{ title }}</a>' +
        '<div class="meta">' +
          '<span class="right floated time">2 days ago</span>' +
          '<span class="category">{{ continent }}, {{ country }} {{ type }}</span>' +
        '</div>' +
        '<div class="description">' +
          '{{ blurb }}' +
        '</div>' +
      '</div>' + 
      '<div class="extra content">' +
        '<div class="right floated author">' +
          '<img class="ui avatar image" src="{{ teacher.image }}"><a href="{{ teacher.url }}">{{ teacher.name.first }}' +
        '</div>' +
      '</div>' +
    '</div>');


  Handlebars.registerPartial('reviewClassesCard', 
    // '<div class="ui centered card">' + 
    '<div class="ui card">' + 
      '<div class="ui fluid image">' + 
        '<img class = "square" src="{{ photos.[0] }}">' +
      '</div>' +
      '<div class="content">' +
        '<a class="header">{{ title }}</a>' +
        '<div class="meta">' +
          '<span class="right floated time">2 days ago</span>' +
          '<span class="category">{{ continent }}, {{ country }} {{ type }}</span>' +
        '</div>' +
        '<div class="description">' +
          '{{ blurb }}' +
        '</div>' +
      '</div>' + 
      '<a class="ui bottom attached button" href="/review">' +
        '<i class="add icon"></i>' +
          'Review' +
      '</a>' +
    '</div>');

  Handlebars.registerPartial('learnClassesCard', 
    '<div class="ui card" style="margin-left:25px;">' + 
      '<a class="ui fluid image" href="/class?id={{ _id }}">' + 
        '<img class = "square" src="{{ photos.[0] }}">' +
      '</a>' +
      '<div class="content">' +
        '<a class="header" href="/class?id={{ _id }}">{{ name }}</a>' +
        '<div class="meta">' +
          '<span class="category">{{ cultures.continent }}, {{ cultures.country }} {{ activity }}</span>' +
        '</div>' +
      '</div>' + 
      '<div class="extra content">' +
        '<div class="left floated ui star rating" data-rating="3"></div>' +
        '<div class="right floated author">' +
          '<img class="ui avatar image" src="{{ teacherInfo.image }}"><a href="{{ teacherInfo.url }}">{{ teacher.name.first }}' +
        '</div>' +
      '</div>' +
    '</div>');

  // Handlebars.registerPartial('teachingsSearch', 
  //     '<div class = "ui segment vertical menu" id = "sidebar">' + 
  //       '<a class="header" href="/class?id={{ _id }}">{{ name }}</a>' +
  //       '<div class="meta">' +
  //         '<span class="category">{{ cultures.continent }}, {{ cultures.country }} {{ activity }}</span>' +
  //       '</div>' +  
  //     '<div>');


})(this, this.document);
