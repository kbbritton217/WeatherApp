# WeatherApp


This is a small app that consumes the API for [OpenWeatherMap.org](http://openweathermap.org/api) as well as the [darksky.net](https://darksky.net/dev/docs) API.

I was able to create this app after studying the [NYTimes API](https://developer.nytimes.com/) and building a similar app to pull up articles from a tutorial.

Feel free to clone or download. This is just the client side. There is a server, as it was needed to access the darksky api, the information for it can be found in index.js. You will need node installed globally on your system so you can run `npm init` in command prompt at the root of your project. http-server will then need to be added to the app by running `npm install http-server --save`. 

Or, you can view a deployed version by clicking [HERE](http://weatherapp-dc.herokuapp.com/?).

>Tip: The Universal Coordinated Time (UTC) is the time set by the World Time >Standard.
>Note: UTC time is the same as GMT time." 
from [W3Schools](https://www.w3schools.com/jsref/jsref_gettimezoneoffset.asp).
