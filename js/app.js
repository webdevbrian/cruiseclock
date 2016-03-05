$(document).ready(function() {

    // Defaults
    var hasInit;

    // Scroll and hide address bar on load, useful for mobile devices like iOS to hide top
    // address bar to increase initial viewport size
    window.addEventListener("load",function() {
      setTimeout(function(){
        window.scrollTo(0, 1);
      }, 0);
    });

    // Init clock on touch (needs a touch event to have the boat honk sound effect work - thanks iOS!)
    var clickTouch = ('ontouchend' in document.documentElement ? "touchend" : "click");
    $(document).bind(clickTouch, function(e) {
      if(hasInit!=true){

        // Honk da boat
        if (config.playBoatHorn){
          boatHonk();
        }

        // Init timer
        timer = setInterval(showRemaining, 1000);

        // Init weather update every 20 minutes
        updateWeather = setInterval(weatherUpdate, 1200000);

        // Init weather & time remaining on first load
        weatherUpdate();
        showRemaining();

        $('#version').hide();
        $('#touchStart').hide();

        hasInit = true;
      };

    });

    // Let's set the count down date and time, we're firing off the count down timer a day beforehand, so we can see that it's cruise time!

    var cruiseEnd = new Date(config.cruiseDate);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    function showRemaining() {
      var now = new Date();
      var timeRemaining = cruiseEnd - now;

      // Count down is over, let's show a message that it's cruise time!
      if (timeRemaining <= 0) {
        clearInterval(timer);
        $('#countdown').html('');
        $('#countdown').html('<img src="images/'+config.cruiseTimeImage+'" />');
        timerTime();
        return;
      };

      var days = Math.floor(timeRemaining / _day);
      var hours = Math.floor((timeRemaining % _day) / _hour);
      var minutes = Math.floor((timeRemaining % _hour) / _minute);
      var seconds = Math.floor((timeRemaining % _minute) / _second);
      var dayDays = 'days';

      if(days == 1){ dayDays = ' day' } else if( days == 0) { dayDays = ' days' };

      $('#countdown').html('<div id="days">' + days + ' ' + dayDays + '</div><div id="hours">' + hours + ' hrs' + '</div><div id="minutes">' + minutes + ' mins' + '</div><div id="seconds">' + seconds + ' secs' + '</div>');

      // Fire off the boat horn every hour
      if (config.playBoatHorn){
        if(minutes=='0' && seconds =='0'){
          boatHonk();
        };
      };
    };

    function boatHonk() {
      $('#boatHonk').get(0).play();
    };

    function timerTime() {
      $('#timerSong').get(0).play();
    };

    function weatherUpdate() {

      // Clear the old weather content
      $('#weather').html('LOADING');

      // Init Simple Weather and populate #weather
      $.simpleWeather({
        zipcode: config.weatherLocation,
        unit: config.weatherUnit,
        success: function(weather) {
          html = 'Current weather in '+weather.city+':<br/>' + weather.temp + config.weatherUnit +', ' + weather.currently + '<img src="'+weather.thumbnail+'" />';
          $("#weather").html(html);
        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      });

    };

    // Init Flickr API, and create backstretch instance
    var makeFlickrRequest = function(options, cb) {
      var url, item, first;

      url = "https://api.flickr.com/services/rest/";
      first = true;
      $.each(options, function(key, value) {
        url += (first ? "?" : "&") + key + "=" + value;
        first = false;
      });

      $.get(url, function(data) { cb(data); });

    };

    var options = {
      "api_key": "b1e28f8678b531648d4601d5db96adfb",
      "method": "flickr.photos.search",
      "format": "json",
      "safe_search": "1",
      "nojsoncallback": "1",
      "media": "photos",
      "tags": config.cruiseName
    };


    makeFlickrRequest(options, function(data) {
      // We need to construct an array of the correctly formed image urls for backstretch
      var flickrImgs = [];
      for (var i=0;i<99;i++) {
        var url = 'https://farm' + data['photos']['photo'][i].farm + '.staticflickr.com/' + data['photos']['photo'][i].server + '/' + data['photos']['photo'][i].id + '_' + data['photos']['photo'][i].secret + '_z.jpg';
        flickrImgs.push(url);
      };

      // Shuffle the flickr images
      shuffle(flickrImgs);

      // Call backstretch 
      $.backstretch(flickrImgs);
    });

}); // DOM Ready

// Shuffle an array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};