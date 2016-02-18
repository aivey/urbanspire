var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var ObjectId = mongoose.Schema.ObjectId;

//var uristring = 'mongodb://heroku_r5qwbz8x:1bd9cddavabsbsui17ld16h1p9@ds027335.mongolab.com:27335/heroku_r5qwbz8x';

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/HelloMongoose';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('Error connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

var User;
var Location;
var Culture;
var ClassType;
var Class;
var Review;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

  var locationsSchema = mongoose.Schema({
    name: { type: String, required: true, index: true },                                          //name of place
    address: { type: {street: String, city: String, cc: String}, required: true, index: true }, //address
    loc: { type: [Number], index: '2d' },                //latitude and longitude of location
    availableSpaces: [{room: String, timesAvailable: [Date], timesBooked: [Date], capacity: Number}], //array of available rooms in the space, the times it is available, and room capacity
    fee: {type: Number, default: -1 }                     //0 if no fee to use space, otherwise some value
  });

  locationsSchema.index({ name: 1, location: -1 }, { unique: true });

  var culturesSchema = mongoose.Schema({
    name: { type: String, required: true, index: { unique: true }},           //name of the culture
    type: Number,           //0 for city, 1 for country, 2 for continent
    city: String,           //city that the culture is from
    num: Number,
    country: String,          //country that the culture is from
    continent: String           //continent that the culture is from
  });

  var classTypesSchema = mongoose.Schema({
    type: { type: String, required: true, index: { unique: true }} //type of class. ex. Dancing, Art, etc.
  });

  // Create class schema
  var classSchema = mongoose.Schema({
    name: { type: String, required: true },						//name of class
    blurb: { type: String, required: true },					//blurb about the class
    teacher: { type: Number, required: true }, 					//id of teacher
    photos: [String],					//name of photo for cover picture
    rating: Number,						//rating out of 5 stars
    numRatings: Number,       //number of times rated
    //location: { type: {street: String, city: String, state: String, cc: String}, required: true },	//location string {street, city, country code}
    radius: Number,						//the preferred max radius for ppl to be in the class
    culture: Number,	//CHANGE BACK LATER			//ids of cultures that it belongs to (European, French, Parisian)
  	type: { type: Number, required: true }, //{ type: ObjectId, required: true },						//id of class type (dance, cooking, etc.)
  	numberOfSpots: { type: Number, required: true, min: 0 },				//number of people allowed to participate in class
  	feed: Boolean,						//true if has fee, false if doesn't. can only have fee if approved
  	fee: Number,						//holds actual value of fee if feed class
  	sessions: { type: [{timeAndDates: [{start: Date, end: Date}], participants: [ObjectId], numWeeks: Number }], required: false },	//dates the class is offered, Number of People Signed up
  	tags: [String],						//tags
  	meta: {	type: {							//meta data
      favs: Number,					//number of favorites class has
  		thumbsUp: Number 				//number of thumbsup the class has
  	}, required: false }
  });

  classSchema.index({ name: 1, teacher: -1 });

  var reviewSchema = mongoose.Schema({
  	userId: { type: ObjectId, required: true },						//id of user who created review
  	classId: { type: ObjectId, required: true },					//id of class the review is for
  	message: { type: String, required: true },
    stars: { type: Number, required: false},					    //text of review
  	datePosted: { type: Date, required: false, default: Date.now } 			//Date the review was posted
  });

  reviewSchema.index({ userId: 1, classId: -1 }, { unique: true });

  var userSchema = mongoose.Schema({
  	name: {
  		first: { type: String, required: true }, 
  		last: { type: String, required: true }
  	},
  	email: { type: String, required: true, unique: true },						//persons email
    num: Number, //REMOVE THIS LATER
    password: { type: String, required: false }, //CHANGE BACK TO TRUE
    description: String,
    image: { type: String, required: false, default: "defaultProfileImage.png" },
  	location: {street: String, city: String, cc: String}, //persons default location
  	language: String,					//persons preferred/first language
  	signedUp: [ObjectId],				//id of the class they are currently signed up to take
  	teaching: [ObjectId], 				//id of the classes they are signed up to teach
  	took: [ObjectId],					//id of the classes they already took
  	taught: [ObjectId],					//id of past classes they taught
  	favs: [ObjectId],					//ids of classes they have favorited
  	newcomer: Boolean,					//true if you consider yourself a newcomer, false if local
    teacher: Boolean,           //whether you are registered to teach
    connections: { type: Number, default: 0 }        //
  });

  User = mongoose.model('User', userSchema);
  Location = mongoose.model('Location', locationsSchema);
  Culture = mongoose.model('Culture', culturesSchema);
  ClassType = mongoose.model('ClassType', classTypesSchema);
  Class = mongoose.model('Class', classSchema);
  Review = mongoose.model('Review', reviewSchema);

  //console.log(user);
  //console.log(classy);
});

module.exports = {
    databaseQuery: function(request, response, parameters) {
      if(request == '/search') {
        var classes = [];
        var params = parameters;
        var culture = "";
        if(params.culture != 0) {
          if(params.culture == 1) {
            culture = "Asia";
          } else if(params.culture == 2) {
            culture = "Europe";
          } else if(params.culture == 3) {
            culture = "Africa";
          } else if(params.culture == 4) {
            culture = "Middle East";
          } else if(params.culture == 5) {
            culture = "South America";
          } else if(params.culture == 6) {
            culture = "North America";
          } 
        }
        console.log()

        var classesByCulture;
        Culture.find({ "continent": culture }, 'num', function(error, cultures) {
          if(error) {
            throw error;
          } else {
            cultureNums = [];
            cultures.forEach(function(element, index, array) {
              cultureNums.push(element.num);
            });
            console.log(cultureNums);
            console.log(params.activity);
            Class.find({ "culture": {$in: cultureNums }, "type": params.activity }, function(error, classes) {
              if(error) {
                throw error;
              } else {
                // var data = [];
                // classes.forEach(
                //   function (classy) {
                //     classy.teacher = User.findOne( { "num": classy.teacher } );
                //     console.log(classy.teacher);
                //     classy.cultures = Culture.findOne( { "num": classy.num  } );
                //     console.log(classy.cultures);
                //     if(classy.type == 1) {
                //       classy.activity = "Dance";
                //     } else if (classy.type == 2) {
                //       classy.activity = "Cooking";
                //     }else if (classy.type == 3) {
                //       classy.activity = "Art";
                //     }else if (classy.type == 4) {
                //       classy.activity = "Music";
                //     }
                //     data.push(classy);
                //   }
                // );
                // //console.log(data);
                // response.status(200).json(data);
                response.status(200).json(classes);
              }
            });
          }
        });

      } else if(request == '/recommendations') {
        Class.find(function(error, classes) {
          if(error) {
            throw error;
          } else {
            var data = [];
            var finished = classes.length;
            // classes.forEach(
            //   function (element, index, array) {
            //     var newElement = {};
            //     newElement.classInfo = array[index];
            //     if(element.type == 1) {
            //       newElement.activity = "Dance";
            //     } else if (element.type == 2) {
            //       newElement.activity = "Cooking";
            //     }else if (element.type == 3) {
            //       newElement.activity = "Art";
            //     }else if (element.type == 4) {
            //       newElement.activity = "Music";
            //     }
            //     User.findOne( { "num": element.teacher }, function(err, teacher) {
            //       if (err) {

            //       } else {
            //         //console.log(teacher);
            //         newElement.teacherInfo = teacher;
            //         //console.log(newElement.teacherInfo);
            //         Culture.findOne({ "num": element.culture }, function(errorr, cultureInfo) {
            //           if (errorr) {

            //           } else {
            //             //console.log(culture);
            //             newElement.cultureInfo = culture;
            //             //console.log(newElement.cultureInfo);
            //             data.push(newElement);
            //           }
            //           finished-=1;
            //         });
            //       }
            //     });
            //   }
            // );
            // //console.log(classes);
            // while(finished > 0) {
            //   console.log("waiting");
            // }
            //console.log(data);
            //response.status(200).json(data);
            response.status(200).json(classes);
          }
        });
      }
    },
    DatabaseSetup: function(request) {
      console.log("actually running database setup");
      if(request == '/class/search') {

      }
      else if (request == '/databaseSetup') {
        console.log("actually running database setup");
            
        handleError = function(err) {
          console.log(err);
        }

        User.create({
        name: {
        first: 'Adrienne',
        last: 'Nowalkha'
        },
        email: 'adrienne.nowal@gmail.com',
        num: 1,
        description: 'I\'m originally from LA and love to learn about other cultures!' }, function(err, user1) {//iterate the user# to get the correct id for classes

        });

        User.create({
        name: {
        first: 'Vinh',
        last: 'Phan'
        },
        email: 'vinh.phan31@gmail.com',
        num: 2,
        description: 'I moved from Vietnam a year ago to the USA. I am still getting accustomed to american culture. I often miss home and would like to share some of my culture with you all!' }, function(err, user2) {

        });
        User.create({
        name: {
        first: 'Peter',
        last: 'Pepered'
        },
        email: 'peter.pep@gmail.com',
        num: 3,
        description: 'I\'m an avid traveller and chef and would love to learn about asian dishes!' }, function(err, user3) {

        });
        User.create({
        name: {
        first: 'Cindy',
        last: 'Kong'
        },
        email: 'cindy.kong@gmail.com',
        num: 4,
        description: 'I recently moved from China and am excited to share my culture with America!' }, function(err, user4) {

        });

                Culture.create({
            name: 'Vietnamese',     //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
            num: 1,
            country: 'Vietnam',   //country that the culture is from
            continent: 'Asia'     //continent that the culture is from
        }, function(err, culture1) {

        });

        Culture.create({
            name: 'Chinese',      //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
            num: 2,
            country: 'China',   //country that the culture is from
            continent: 'Asia'     //continent that the culture is from
        }, function(err, culture2) {

        });

        Class.create({ 
        name: 'Vietnamese Bahn Mi Sandwich Making',
        blurb: 'Sandwiches made using traditional Vietnamese baguette-like bread, and combining ingredients from the French culinary tradition (such as duck and mayonnaise) with traditional Vietnamese vegetables and other ingredients. Vegetarian options available, please bring your own ingredients (which we can decide upon beforehand)!',
        teacher: 2, //refer to user#
        photos: ['/images/imageName.png'],
        location: {
          street: '42414 Massi Street',
          city: 'Palo Alto',
          state: 'California',
          cc: 'USA'
        },
        culture: 1,
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 10,
        }, function (err, class1) { //iterate class# as u make classes
          console.log(err);
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Chinese Calligraphy',
        blurb: 'One of the wonders handed down to us by Ancient China!',
        teacher: 4, //refer to user#
        photos: ['/images/calligraphy.jpeg'],
        location: {
          street: '42414 Havencroft Street',
          city: 'Palo Alto',
          state: 'California',
          cc: 'USA'
        },
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 10,
        }, function (err, class2) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Moroccan',
        blurb: '',
        teacher: 2, //refer to user#
        photos: ['/images/imageName.png'],
        location: {
          street: '42414 Massi Street',
          city: 'Palo Alto',
          state: 'California',
          cc: 'USA'
        },
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 10,
        }, function (err, class3) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        User.create({
        name: {
        first: 'Adhama',
        last: 'Mbuzi'
        },
        email: 'a.mbuzi369@gmail.com',
        num: 100, 
        description: 'I moved to the Bay Area from Nairobi, Kenya a couple of months ago, in the context of an MBA program. I am super excited to get to know this community, and am eager to share my love for Kenyan song and dance with the other music-lovers in the area!' }, function(err, user100) {

        });

        User.create({
        name: {
        first: 'Kevin',
        last: 'Udambe'
        },
        email: 'kudambe@gmail.com',
        num:5, 
        description: 'I moved here from Uganda a couple of months ago for my dream job in Silicon Valley. I miss food from home a lot - ugali, matoke, mandazi - and I cannot wait to make and savor it with other people from the community!' }, function(err, user5) {

        });

        User.create({
        name: {
        first: 'Yanisha',
        last: 'Hope'
        },
        email: 'yanishahope88@gmail.com',
        num:6,
        description: 'Hi! I\'m Yanisha from Cape Town, South Africa. Fascinated by the apartheid period and looking for other similarly-motivated history buffs to share cool history parapharnelia!' }, function(err, user6) {

        });

        User.create({
        name: {
        first: 'Keyani',
        last: 'Mascarpone'
        },
        email: 'kvm45@gmail.com',
        num: 7,
        description: 'Hello everyone :) My name is Keyani and I am from Mogadishu, Mozambique. I am a native speaker of Portuguese and am eager to share my love for the language and its literature with others who want to learn!' }, function(err, user7) {

        });


        User.create({
        name: {
        first: 'Sheena',
        last: 'Veehar'
        },
        email: 'sheenaveehar@hotmail.com',
        num:8, 
        description: 'I am from Mumbai, India, the “City of Dreams”. I moved to the Bay Area five years ago with my husband and children, and am excited at prospect of exploring a unique blend of Indian and American culture with other members of the community' }, function(err, user8) {

        });

        User.create({
        name: {
        first: 'Johnny',
        last: 'Walker'
        },
        num:9, 
        email: 'johnnywalker@gmail.com',
        description: 'White heterosexual male in early 20s, originally from the suburbs of New Jersey but now working in Silicon Valley. Looking to learn more about the cultures that exist beyond my nation\'s boundaries!' }, function(err, user9) {

        });

        Culture.create({
            name:'Japanese',      //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 3,
            country:'Japan',    //country that the culture is from
            continent: 'Asia'     //continent that the culture is from
        }, function(err, culture3) {

        });

        Culture.create({
            name: 'Korean',     //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 4,
            country: 'Korea',   //country that the culture is from
            continent: 'Asia'     //continent that the culture is from
        }, function(err, culture4) {

        });

        Culture.create({
            name: 'Mozambiquan',      //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 5,
            country: 'Mozambique',    //country that the culture is from
            continent:'Africa'    //continent that the culture is from
        }, function(err, culture5) {

        });

        Culture.create({
            name: 'Mumbai',     //name of the culture
            type: 0,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 6,
            country: 'India',   //country that the culture is from
            continent:'Asia'    //continent that the culture is from
        }, function(err, culture6) {

        });

        Culture.create({
            name: 'South Africa',     //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 7,
            country: 'South Africa',    //country that the culture is from
            continent:'Africa'    //continent that the culture is from
        }, function(err, culture7) {

        });

        Culture.create({
            name: 'Masaai Mara',      //name of the culture
            type: 0,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 8,
            country: 'Kenya',   //country that the culture is from
            continent:'Africa'    //continent that the culture is from
        }, function(err, culture8) {

        });

        Culture.create({
            name: 'Uganda',     //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 9,
            country: 'Uganda',    //country that the culture is from
            continent:'Africa'   //continent that the culture is from
        }, function(err, culture9) {

        });

        Culture.create({
            name: 'Kenya',      //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 10,
            country: 'Kenya',   //country that the culture is from
            continent:'Africa'    //continent that the culture is from
        }, function(err, culture10) {

        }); 

        Class.create({ 
        name: 'Portuguese Literature from Mozambique',
        blurb: 'Delving into literature written in Portuguese from Mozambique. Reading suggestions welcome.',
        teacher: 7, //refer to user#
        photos: ['/images/portuguesebooks.jpg'],
        location: {
          street: '42331 Mission Street',
          city: 'San Francisco',
          state: 'California',
          cc: 'USA'
        },
        culture: 5,
        type: 3, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class11) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Mia Couto: The Mozambiquan Master of Short Stories',
        blurb: 'Mia Couto is arguably one of the greatest Mozambiquan writers of all time - let\'s read his work together!',
        teacher: 7, //refer to user#
        photos: ['/images/poetry.jpeg'],
        location: {
          street: '42331 Mission Street',
          city: 'San Francisco',
          state: 'California',
          cc: 'USA'
        },
        culture: 5,
        type: 3, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class12) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });


        Class.create({ 
        name: 'Bollywood Dance from the 90s',
        blurb: 'Let\'s Dance to Bollywood Hits from the Golden Ages!',
        teacher: 8, //refer to user#
        photos: ['/images/bollywood.jpg'],
        location: {
          street: '65 El Camino Real',
          city: 'MountainView',
          state: 'California',
          cc: 'USA'
        },
        culture: 6, 
        type: 3, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class13) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Apartheid Reggae',
        blurb: 'Let\'s have fun listening to, singing and dancing to apartheid reggae music together!',
        teacher: 6, //refer to user#
        photos: ['/images/apartheidreggae.jpg'],
        location: {
          street: '65 Mission Street',
          city: 'San Francisco',
          state: 'California',
          cc: 'USA'
        },
        culture: 7,
        type: 3, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 3,
        }, function (err, class14) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Making Ugali (Uganda)',
        blurb: 'Come make Ugali, a flour-based component of Ugandan diets. Bring your own ingredients. We shall eat it with stew and vegetables afterwards.',
        teacher: 5, //refer to user#
        photos: ['/images/ugaliuganda.jpg'],
        location: {
          street: '687 Alma Street',
          city: 'Palo Alto',
          state: 'California',
          cc: 'USA'
        },
        culture: 9,
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 3
        }, function (err, class15) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Making Ugali (Kenya)',
        blurb: 'Learn how to make the staple of a Kenyan diet!',
        teacher: 4, //refer to user#
        photos: ['/images/ugalikenya.jpg'],
        location: {
          street: '7584 PineHill Apartments, the Castro',
          city: 'San Francisco',
          state: 'California',
          cc: 'USA'
        },
        culture: 10,
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class16) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Traditional Kenyan Folk Song',
        blurb: 'Come to have fun and learn to sing popular Kenyan folk songs such as “Wana Barak” and “Malaika”',
        teacher: 4, //refer to user#
        photos: ['/images/kenyanfolkdance.jpg'],
        location: {
          street: '7584 PineHill Apartments, the Castro',
          city: 'San Francisco',
          state: 'California',
          cc: 'USA'
        },
        culture: 10,
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class17) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Weaving in the Maasai Mara Tradition',
        blurb: 'Learn about fabric manipulation from one of the world\'s most intriguing traditions.',
        teacher: 4, //refer to user#
        photos: ['/images/weaving.jpeg'],
        location: {
          street: '7584 PineHill Apartments, the Castro',
          city: 'San Francisco',
          state: 'California',
          cc: 'USA'
        },
        culture: 8,
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class18) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Talking about Ugandan Politics: The Art of Corruption',
        blurb: 'Corruption is a prevalent issue in Ugandan politics: come join us for a healthy debate about its complex realities.',
        teacher: 5, //refer to user#
        photos: ['/images/ugandapolitics.jpg'],
        location: {
          street: '687 Alma Street',
          city: 'Palo Alto',
          state: 'California',
          cc: 'USA'
        },
        culture: 9,
        type: 3, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class19) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Making Maasai Mara Jewelry',
        blurb: 'Learn how to make some of the most beautiful jewelry in the world, using natural beads and matierals.',
        teacher: 4, //refer to user#
        photos: ['/images/beadweaving.jpg'],
        location: {
          street: '7584 PineHill Apartments, the Castro',
          city: 'San Francisco',
          state: 'California',
          cc: 'USA'
        },
        culture: 8, 
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class20) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Toyi-Toyi Dance',
        blurb: 'Toyi-Toyi is a dance form that originated in Zimbabwe and was used as a form of protest during the Apartheid period in South Africa. It is political, rhythmic and colorful - what more could one look for in a dance form!',
        teacher: 6, //refer to user#
        photos: ['/images/toyitoyi.jpg'],
        location: {
          street: '65 Mission Street',
          city: 'San Francisco',
          state: 'California',
          cc: 'USA'
        },
        culture: 7, 
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 15,
        }, function (err, class21) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        User.create({
        name: {
        first: 'Christina',
        last: 'Kao'
        },
        email: 'fredrachelkao@gmail.com',
        num:99, 
        description: 'Born and raised in Taiwan, I first came to the States 5 years ago for college. Despite having been here for so long, I still don\'t feel completely integrated from time to time, and would love to get to know members in my community better through sharing my love for Chinese calligraphy and Taiwanese food. :)' }, function(err, user99) {

        });

        User.create({
        name: {
        first: 'Vanessa',
        last: 'Chen'
        },
        email: 'vchen128@gmail.com',
        num:98,
        description: 'I am from Beijing, and am here on a medical scholarship. I love to cook - and hope to find locals with similar interests to share recipes or cook together!' }, function(err, user98) {

        });

        User.create({
        name: {
        first: 'Take',
        last: 'Mabuchi'
        },
        email: 'takemabuchi45@gmail.com',
        num:97, 
        description: 'Hi everyone! I just came from Tokyo and am here participating in an incubator program. Anyone a fan of anime or the Japanese culture / language? Hit me up!' }, function(err, user97) {

        });

        User.create({
        name: {
        first: 'Kyle',
        last: 'Guo'
        },
        num:96, 
        email: 'kylegguo0915@gmail.com',
        description: 'Relocated from Hong Kong beginning of the year. I was in the financial industry for several years, decided to switch into Fintech, and just started at a P2P lending startup as a product manager. I would love to share my knowledge in finance and the Chinese economy!' }, function(err, user96) {

        });

        User.create({
        name: {
        first: 'Adam',
        last: 'Baudin'
        },
        email: 'adammb6@gmail.com',
        num:95,
        description: 'I went to culinary school back in France, just moved here a month ago, started a small restaurant in downtown Palo Alto, and want to share my love for French cuisine!' }, function(err, user95) {

        });

        User.create({
        name: {
        first: 'Lorenz',
        last: 'Bertram'
        },
        email: 'lorenzzz@gmail.com',
        num:94,
        description: 'I am an entrepreneur from Germany, but I miss my food! Want to share my favorite German dishes with the community.' }, function(err, user94) {

        });

        Culture.create({
            name: 'French',     //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 8,
            country: 'France',    //country that the culture is from
            continent:'Europe'   //continent that the culture is from
        }, function(err, culture8) {

        });

        Culture.create({
            name: 'German',     //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 9,
            country: 'Germany',   //country that the culture is from
            continent:'Europe'    //continent that the culture is from
        }, function(err, culture9) {

        });

        Class.create({ 
        name: 'French Cooking',
        blurb: 'Come learn how to make Moules Marinieres!',
        teacher: 94, //refer to user#
        photos: ['/images/imageName.png'],
        location: {
          street: '3800 Quail Drive',
          city: 'Palo Alto',
          state: 'California',
          cc: 'USA'
        },
        culture: 8,   //refer to culture#
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class22) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });


        Class.create({ 
        name: 'Sauerbraten',
        blurb: 'Learn how to make a German pot roast, which is regarded as one of the national dishes!',
        teacher: 95, //refer to user#
        photos: ['/images/imageName.png'],
        location: {
          street: '750 Escondido Road',
          city: 'Palo Alto',
          state: 'California',
          cc: 'USA'
        },
        culture: 9,   //refer to culture#
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 3,
        }, function (err, class23) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });


        Class.create({ 
        name: 'Chinese Calligraphy',
        blurb: 'Come learn the history and different styles of Chinese calligraphy, and try practice the art yourself!',
        teacher: 99, //refer to user#
        photos: ['/images/imageName.png'],
        location: {
          street: '750 Escondido Road',
          city: 'Palo Alto',
          state: 'California',
          cc: 'USA'
        },
        culture: 4,   //refer to culture#
        type: 3, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 8,
        }, function (err, class24) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Peking Duck',
        blurb: 'Let\'s make some yummy Peking Duck together, and try and get creative by making Chinese fusion dishes by incorporating cooking styles from your home culture :)',
        teacher: 99, //refer to user#
        photos: ['/images/imageName.png'],
        location: {
          street: '750 Escondido Road',
          city: 'Palo Alto',
          state: 'California',
          cc: 'USA'
        },
        culture: 4,   //refer to culture#
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 5,
        }, function (err, class25) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        User.create({
        name: {
        first: 'Sam',
        last: 'Godrick'
        },
        email: 'samjgodrick@yahoo.com ',
        num: 14,
        description: 'I just finished my undergraduate studies in Mechanical Engineering. Having lived in this country for all of my life, I would like to get in touch with my cultural roots. I can\'t wait to learn from my neighbors at UrbanSpire! :)' }, function(err, user14) {

        });
        User.create({
        name: {
        first: 'Patrick',
        last: 'Ocon'
        },
        email: 'opatrick938@comcast.net',
        num: 15,
        description: 'I am a foreign student attending a local university and I am double majoring in art and Latin American studies. I wish to share my knowledge with my UrbanSpire neighbors and I hope they enjoy making art as much as I do.' }, function(err, user15) {

        });
        User.create({
        name: {
        first: 'Jose',
        last: 'Acosta'
        },
        email: 'jajaesmi@gmail.com',
        num: 16,
        description: 'I am new to the United States and would like to share the food and music from my home culture. I have played the trumpet for 12 years.' }, function(err, user16) {

        });
        User.create({
        name: {
        first: 'Larissa',
        last: 'Garcia'
        },
        email: 'garcia.larissa88@gmail.com',
        num: 17,
        description: 'Dancing has been a large component of my life. I have been largely involved in Latin dance for many years and would love to share my love for it with my community at UrbanSpire.' }, function(err, user17) {

        });

        Culture.create({
            name: 'Mexican',      //name of the culture
            type: 1,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 11,
            country: 'Mexico',    //country that the culture is from
            continent: 'North America'    //continent that the culture is from
        }, function(err, culture11) {

        });

        Culture.create({
            name: 'South American', //name of the culture
            type: 2,      //0 for city, 1 for country, 2 for continent
            city: null,     //city that the culture is from
          num: 12,
            country: null,    //country that the culture is from
            continent: 'South America'    //continent that the culture is from
        }, function(err, culture12) {

        });

        Class.create({ 
        name: 'Salsa Dancing',
        blurb: 'Come learn salsa, an exuberant and sensual style of partner dancing that originated from the Caribbean.',
        teacher: 17, //refer to user#
        photos: ['/images/salsa.jpg'],
        location: {
          street: '3369 Union Avenue',
          city: 'San Jose',
          state: 'California',
          cc: 'USA'
        },
        culture: 12,
        type: 2, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 12,
        }, function (err, class26) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Merengue Dancing',
        blurb: 'The official dance of the Dominican Republic! A great introduction to the Latin dance styles, merengue is a partner dance where the upper body is kept majestic and turns are slow with usually four beats/steps per complete turn.',
        teacher: 17, //refer to user#
        photos: ['/images/merengue.jpg'],
        location: {
          street: '3369 Union Avenue',
          city: 'San Jose',
          state: 'California',
          cc: 'USA'
        },
        type: 2, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 10,
        }, function (err, class27) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Tango Dancing',
        blurb: 'From the border between Uruguay and Argentina, this partner dance also has influences from European and African cultures.',
        teacher: 17, //refer to user#
        photos: ['/images/tango.jpg'],
        location: {
          street: '3369 Union Avenue',
          city: 'San Jose',
          state: 'California',
          cc: 'USA'
        },
        type: 2, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 10,
        }, function (err, class28) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Mexican Chilaquiles',
        blurb: 'Learn about how to make chilaquiles. This is a dish with fried corn tortillas, meat, and either salsa or mole sauce. It\'s my favorite dish that my grandma used to make me when I was young.',
        teacher: 16, //refer to user#
        photos: ['/images/chilaquiles.jpg'],
        location: {
          street: '6445 Camden Avenue',
          city: 'San Jose',
          state: 'California',
          cc: 'USA'
        },
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 3,
        }, function (err, class29) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Mexican Spicy Hot Chocolate',
        blurb: 'A perfect recipe for the cold weather, this hot chocolate will both warm you and satisfy your sweet tooth',
        teacher: 16, //refer to user#
        photos: ['/images/hotchocolate.jpg'],
        location: {
          street: '6445 Camden Avenue',
          city: 'San Jose',
          state: 'California',
          cc: 'USA'
        },
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 10,
        }, function (err, class30) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Brazilian Cheese Bread',
        blurb: 'It\'s cheesy! It\'s doughy! If you want a nice warm snack that oozes with cheesy goodness, come and learn!',
        teacher: 17, //refer to user#
        photos: ['/images/cheese_bread.jpg'],
        location: {
          street: '6445 Camden Avenue',
          city: 'San Jose',
          state: 'California',
          cc: 'USA'
        },
        type: 1, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 8,
        }, function (err, class31) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Mexican Folk Dancing',
        blurb: 'Mexican Folk Dancing is an important part of the Mexican culture. It has a stunning display of colors and upbeat music.',
        teacher: 17, //refer to user#
        photos: ['/images/folk_dancing.jpg'],
        location: {
          street: '3369 Union Avenue',
          city: 'San Jose',
          state: 'California',
          cc: 'USA'
        },
        type: 2, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 12,
        }, function (err, class32) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });

        Class.create({ 
        name: 'Mariachi Trumpet Playing',
        blurb: 'Mariachi is a musical expression that dates back to 19th century Western Mexico. The trumpet is part of the mariachi band and often has melodic phrases that helps create the cultural feeling of the music.',
        teacher: 16, //refer to user#
        photos: ['/images/mariachi.jpg'],
        location: {
          street: '6445 Camden Avenue',
          city: 'San Jose',
          state: 'California',
          cc: 'USA'
        },
        type: 4, //cooking is type 1, dancing 2, art 3
        numberOfSpots: 2,
        }, function (err, class33) { //iterate class# as u make classes
          if (err) return handleError(err);
          // saved!
        });
      }
    }
  }