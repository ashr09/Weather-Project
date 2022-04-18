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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-sm-3">
    <div class="forecast-date">${day}</div>
    <img
      src="http://openweathermap.org/img/wn/01d@2x.png"
      alt="clear"
      id="icon"
      width="45"
    />
    <div class="high-and-low">
      <span class="high"> H 68°F </span>
      <span class="low">/ L 60°F</span>
    </div>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  let iconElement = document.querySelector("#icon");
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
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = response.data.main.temp;
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
  event.preventDefault(); //good
  let temperatureElement = document.querySelector("#temperature"); //good
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature"); //good
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//feature 1
let dateElement = document.querySelector("#current-date");
let now = new Date();
dateElement.innerHTML = updatedTimeAndDate(now);

let fahrenheitTemperature = null;

//global
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//global
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Seoul");
displayForecast();
