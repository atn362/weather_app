alert("Find your City!")
//key and url from API site
const api = {
	key: "0db283bdb89e9edc2392d60d1e9f9e73",
	base: "https://api.openweathermap.org/data/2.5/"
}
//Seting a keypress to input search-box information
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
//function that sets keypress to the enter key
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}
//funtion to fetch from site using the api base, key and unit to return results in json
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}
//funtion to display weather results based on city location
function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
//variables defining the current date used to correlate weather conditions
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
//variable to display the temperature of the current date in fahrenheit 
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;
//varialbe to display the current weather(clear, cloudy, etc.) of current date
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
//varialbe to display the average highest and lowest temperature of location
  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}
//funtion to build a date using the variables of the days of the week and months of the year
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//calling the funtion to define the date varibles
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
//returning the results of the current date in time of the current conditions of requested destination
  return `${day} ${date} ${month} ${year}`;
}