// Below are the settings for the app, config to your liking / cruise needs.
var config = {

  // cruiseDate needs to be in MM/DD/YYYY HH:MM PM/AM format
  cruiseDate: '03/26/2016 2:00 AM', 

  // Set to false if you don't want the app to place the boat horn every hour
  playBoatHorn: 'true',

  // Location to display weather info from.  I usually set this as my debarking port but you can set it to whatever you'd like.
  // this will be updated every 5 minutes.  It must be in zipcode format.
  weatherLocation: '33301',

  // Set the weather degree unit (c for celsius or f for fahrenheit )
  weatherUnit: 'F',

  // Change this to your cruise line's name and the boat you're on.  Example: carnival breeze. This will pull in associated rotating
  // background images of your boat / cruise line which will rotate in the background of the clock.
  cruiseName: 'emerald princess',

  // (OPTIONAL)Just in case if you want to rename the count down image, it must be placed in the /images/ folder
  cruiseTimeImage: 'cruisetime.gif',

};