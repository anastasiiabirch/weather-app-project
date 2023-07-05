
function formatDate (now) {
  
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = days[now.getDay()];

  return `${date}, ${hours}:${minutes}`;
}
let dateNow = document.querySelector("#dateNow");
let now = new Date();
dateNow.innerHTML = formatDate(now);

function showCurrentWeather(response) {
  console.log(response);
  let city = document.querySelector(".city");
  let currentTemperature = Math.round(response.data.main.temp);
  let currentTemperatureElement = document.querySelector("#temperature-current");
  let description = document.querySelector("#temperature-description");
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement= document.querySelector("#feelsLike");
  let humidity = document.querySelector("#humidity");
  let windSpeed = Math.round((response.data.wind.speed)*3.6);
  let windSpeedElement = document.querySelector("#windSpeed");
  city.innerHTML = response.data.name;
  currentTemperatureElement.innerHTML = currentTemperature;
  description.innerHTML = response.data.weather[0].main;
  feelsLikeElement.innerHTML = feelsLike;
  humidity.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = windSpeed;

  


}


function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-input");

  let apiKey = "2696f40edf3a7e9f7998b9ca59be8b3d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentWeather); 

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "2696f40edf3a7e9f7998b9ca59be8b3d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector(".location_button");
button.addEventListener("click", getCurrentPosition);







