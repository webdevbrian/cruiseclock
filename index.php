<!DOCTYPE html> 
<html>
<head>
  <title>Cruise Countdown</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, minimum-scale=0.5, maximum-scale=1.0, user-scalable=no"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <link rel="stylesheet" href="css/reset.css" /> 
  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/style.css" />
  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript" src="js/backstretch.js"></script>
  <script type="text/javascript" src="js/weather.js"></script>
  <script type="text/javascript" src="js/app-config.js"></script>
  <script type="text/javascript" src="js/app.js"></script>
</head> 
<body>
  <div id="version">v1.4</div>
  <div id="touchStart">PLEASE TOUCH THE SCREEN TO START CLOCK</div>
  <div id="content">
    <audio id="boatHonk">
      <source src="boat.m4a" type="audio/mpeg">
    </audio>
    <audio id="timerSong" loop>
      <source src="timertime.m4a" type="audio/mpeg">
    </audio>
    <div id="countdown"></div>
    <div id="weather"></div>
  </div>
</body>
</html>