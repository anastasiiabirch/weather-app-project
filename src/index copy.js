let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};


let city = prompt("Enter a city");
city = city.toLowerCase().trim();
if (weather[city] !== undefined) { //if (city in weather) {
  let temperature = weather[city].temp;
  let humidity = weather[city].humidity;
  let cTemperature = Math.round(temperature);
  let fTemperature = Math.round(temperature * 1.8 + 32);

  alert(
    `It is currently ${cTemperature}°C (${fTemperature}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
    alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
    
}



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

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-input");
  let city = document.querySelector(".city");
  if (cityInput.value) {
    city.innerHTML = cityInput.value;
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// feature Bonus
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-current");
  temperatureElement.innerHTML = 61;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);


function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-current");
  temperatureElement.innerHTML = 16;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);