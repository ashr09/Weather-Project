function updatedTimeAndDate(timeAndDate) {
  let hours = timeAndDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = timeAndDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = timeAndDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function searchCity(city) {
  let apiKey = "932728ed3ac711f2d799928cfe7357a9";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "932728ed3ac711f2d799928cfe7357a9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

//feature 1
let dateElement = document.querySelector("#current-date");
let now = new Date();
dateElement.innerHTML = updatedTimeAndDate(now);

//feature 2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//feature 3 (bonus)
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
