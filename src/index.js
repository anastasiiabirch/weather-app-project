
function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;

}

function formatSunrise(timestamp) {
  let sunriseTime = new Date(timestamp);
  let hours = sunriseTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = sunriseTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;

}

function formatSunset(timestamp) {
  let sunsetTime = new Date(timestamp);
  let hours = sunsetTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = sunsetTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];

}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 card">
      <h3>${formatDay(forecastDay.dt)}</h3>
      <div class="img-area">
        <img src="images/${
          forecastDay.weather[0].icon
        }.svg" class="forecast-img forecast-img-1" />
      </div>
      <div class="forecast-temperature">
        <span class="forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span>|</span>
        <span class="forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>`;
    }

  })
  
    forecastHTML = forecastHTML + `</div>`;
    
    forecastElement.innerHTML = forecastHTML;
    


}

function getForecast(coordinates) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showCurrentWeather(response) {
  console.log(response);
  let city = document.querySelector(".city");
  let country = document.querySelector(".country");
  let currentTemperature = Math.round(response.data.main.temp);
  let currentTemperatureElement = document.querySelector(
    "#temperature-current"
  );
  let description = document.querySelector("#temperature-description");
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feelsLike");
  let humidity = document.querySelector("#humidity");
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let windSpeedElement = document.querySelector("#windSpeed");

  let dateElement = document.querySelector("#date");

  let iconElement = document.querySelector("#current-icon");


  celsiusTemperature = response.data.main.temp;

  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");


  city.innerHTML = response.data.name;
  country.innerHTML = response.data.sys.country;
  currentTemperatureElement.innerHTML = currentTemperature;
  description.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = feelsLike;
  humidity.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = windSpeed;
  dateElement.innerHTML = formatDate((response.data.dt + response.data.timezone - 7200) * 1000);
  
  sunriseElement.innerHTML = formatSunrise((response.data.sys.sunrise + response.data.timezone - 7200) * 1000);
  sunsetElement.innerHTML = formatSunset(
    (response.data.sys.sunset + response.data.timezone - 7200) * 1000
  );
  
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);


}

function search(city) {

  let apiKey = "2696f40edf3a7e9f7998b9ca59be8b3d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

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

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 1.8) + 32;
  let temperatureElement = document.querySelector("#temperature-current");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  //remove the active class from the celsius link and add it to the fahrenheit link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-current");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

getCurrentPosition();

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Odesa");
