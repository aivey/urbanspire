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

  Handlebars.registerHelper("getActivityTypeString", function(activityNumber) {
    if (activityNumber === 1) {
      return "Cooking";
    } else if (activityNumber === 2) {
      return "Dance";
    } else if (activityNumber === 3) {
      return "Art";
    } else if (activityNumber === 4) {
      return "Music";
    }
  });

  Handlebars.registerHelper("randomNumber", function(minNumber, maxNumber) {
    return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
  });

  // Handlebars.registerHelper("ifempty", function(array, block) {
  //   if(array.length == 0) {
  //     return block(this);
  //   }
  // });

  Handlebars.registerPartial('profileClassesCard', 
    // '<div class="ui centered card">' + 
    '<div class="ui card">' +       
      '<a class="ui fluid image" href="/class?id={{ _id }}">' + 
        '<img class = "square" src="{{ photos.[0] }}">' +
      '</a>' +
      '<div class="content">' +
        '<a class="header" href="/class?id={{ _id }}">{{ name }}</a>' +
        '<div class="meta">' +
          '<span class="right floated time">02/26/2016</span>' +
          '<span class="category">{{ cultureContinent }}, {{ cultureCountry }} - {{ getActivityTypeString type }}</span>' +
        '</div>' +
        '<div class="description">' +
          '{{ blurb }}' +
        '</div>' +
      '</div>' + 
      '<div class="extra content">' +
        '<div class="right floated author">' +
          '<img class="ui avatar image" src="{{ teacherImage }}"><a href="user/profile?id={{ teacher }}">{{ teacherFirst }}' +
        '</div>' +
      '</div>' +
    '</div>');

  Handlebars.registerPartial('recClassesCard', 
    // '<div class="ui centered card">' + 
    '<div class="ui card">' + 
      '<div class="ui fluid image">' + 
        '<img class = "square" src="{{ photos.[0] }}">' +
      '</div>' +
      '<div class="content">' +
        '<a class="header">{{ name }}</a>' +
      '</div>' + 
    '</div>');


  Handlebars.registerPartial('reviewClassesCard', 
    // '<div class="ui centered card">' + 
    '<div class="ui card">' + 
      '{{ log _id }}' + 
      '<a class="ui fluid image" href="/class?id={{ _id }}">' + 
        '<img class = "square" src="{{ photos.[0] }}">' +
      '</a>' +
      '<div class="content">' +
        '<a class="header" href="/class?id={{ _id }}">{{ name }}</a>' +
        '<div class="meta">' +
          '<span class="right floated time">2 days ago</span>' +
          '<span class="category">{{ cultureContinent }}, {{ cultureCountry }} - {{ getActivityTypeString type }}</span>' +
        '</div>' +
        '<div class="description">' +
          '{{ blurb }}' +
        '</div>' +
      '</div>' + 
      '<a class="ui bottom attached button" href="/review?id={{ _id }}">' +
        '<i class="add icon"></i>' +
          'Review' +
      '</a>' +
    '</div>');

  Handlebars.registerPartial('learnClassesCard', 
    '<div class="ui card" style="margin-left:25px;">' + 
      '<a class="ui fluid image" href="/class?id={{ _id }}" style="height: 170px; overflow: hidden;">' + 
        '<img class = "square" src="{{ photos.[0] }}">' +
      '</a>' +
      '<div class="content">' +
        '<a class="header" href="/class?id={{ _id }}" style="text-align:left;">{{ name }}</a>' +
        '<div class="meta left aligned">' +
          '<span class="category">{{ cultureContinent }}, {{ cultureCountry }} - {{ getActivityTypeString type }}</span></br>' +
          '<span class="category">{{ randomNumber 0 5 }}/{{ randomNumber 6 12 }} Spots Taken!</span>' +
        '</div>' +
      '</div>' + 
      '<div class="extra content">' +
        '<div class="left floated ui large star rating" data-rating="4" style="margin-top:5px;"></div>' +
        '<div class="right floated author">' +
          '<img class="ui avatar image" src="{{ teacherImage }}"><a href="/userprofile?id={{ teacher }}">{{ teacherFirst }}' +
        '</div>' +
      '</div>' +
    '</div>');

  // Handlebars.registerPartial('teachingsSearch', 
  //     '<div class="header"> {{ name }}</div>' +
  //       '<div class="meta">' +
  //         '<span class="category">{{ cultures.continent }}, {{ cultures.country }} {{ activity }}</span>' +
  //       '</div>' +  
  //     '<div>');


})(this, this.document);
