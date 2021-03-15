// Current Date and Time

function formatDate(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[currentDate.getDay()];

  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }

  let minutes = currentDate.getMinutes();
  if (minutes.toString().length === 1) {
  minutes = "0" + minutes;
  }

  return `${day} ${hours}:${minutes}`;
}

let currentDate = new Date();

let date = document.querySelector("#current-date");
date.innerHTML = formatDate(currentDate);

// Search City

function showCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}`;

  document.querySelector("#city").innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "3a3a0502bf30e7785cd5328e4187d649";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchButton = document.querySelector("#city-form");
searchButton.addEventListener("submit", handleSubmit);

// Convert Temperature Units

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) * 5 / 9);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Search Current Location

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3a3a0502bf30e7785cd5328e4187d649";
  let unit = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityTemperature);
}

function handlePosition(response) {
  response.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let geolocateButton = document.querySelector("#geolocate");
geolocateButton.addEventListener("click", handlePosition);

searchCity("New York");