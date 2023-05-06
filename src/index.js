function displayFormatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date();
  let currentDay = days[date.getDay()];
  let currentTime = date.getHours();
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  if (currentTime < 10) {
    currentTime = `0${currentTime}`;
  }
  let formattedDate = `${currentDay}, ${currentTime}:${currentMinutes} `;
  return formattedDate;
}
let timeElement = document.querySelector("#time");
timeElement.innerHTML = displayFormatDate();

function searchCity(city) {
  let apiKey = "951701fea5f706bc05e8bc700e1d4e6e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function displayTemperature(response) {
  document.querySelector(".city").innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector(".temperature");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity ${response.data.main.humidity} %`;
  document.querySelector(".wind").innerHTML = `Wind ${Math.round(
    response.data.wind.speed
  )} km/h`;
  getForecast(response.data.coord);
}
function searchLocation(position) {
  let apiKey = "951701fea5f706bc05e8bc700e1d4e6e";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function showFormValues(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector(".city");
  city.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}
let searchEngineForm = document.querySelector("form");
searchEngineForm.addEventListener("submit", showFormValues);
let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);
function showFahrenheitValues(event) {
  event.preventDefault();

  let celsiusToFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = celsiusToFahrenheit;
}

let celsiusTemperature = null;
let fahrenheitUnits = document.querySelector(".fahrenheitUnits");
fahrenheitUnits.addEventListener("click", showFahrenheitValues);

function showCelsiusValues(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusUnits = document.querySelector(".celsiusUnits");
celsiusUnits.addEventListener("click", showCelsiusValues);
searchLocation();
function getForecast(location) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="WeatherForecast row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
search();
