function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function search(city) {
  let apiKey = "3a3a0502bf30e7785cd5328e4187d649";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
  
  axios.get(apiUrl).then(displayForecast);

}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".temperature");
  currentTemperature.innerHTML = `${temperature}`;

  document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML =`${Math.round(response.data.wind.speed)} km/h`;

  document.querySelector(".description").innerHTML = response.data.weather[0].description;

  document.querySelector(".city").innerHTML = response.data.name;

  document.querySelector(".date").innerHTML = formatDate(response.data.dt * 1000);

  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  kilometersWindSpeed = Math.round(response.data.wind.speed);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="col-2">
        ${formatHours(forecast.dt * 1000)}
        <br />
        <img id="forecast-icon" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        <br />
        <strong><span id="forecast-max">${Math.round(forecast.main.temp_max)}</span>°</strong> <span id="forecast-min">${Math.round(forecast.main.temp_min)}</span>°
        </div>
        `;
  }
}

function formatHours(timestamp) {
   let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes =date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return (`${hours}:${minutes}`);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  day = days[day];
  return(`Last updated at ${day} ${formatHours(timestamp)}`);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  
  let windSpeed = document.querySelector("#wind-speed");
  let milesWindSpeed = Math.round(kilometersWindSpeed / 1.609);
  windSpeed.innerHTML = `${milesWindSpeed} mph`;
}

function displayCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemperature);

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${kilometersWindSpeed} km/h`;
}

function handlePosition(response) {
  response.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3a3a0502bf30e7785cd5328e4187d649";
  let unit = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  
  axios.get(apiUrl).then(displayForecast);
}

let celsiusTemperature = null;
let kilometersWindSpeed = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

let geolocate = document.querySelector("#geolocate-button");
geolocate.addEventListener("click", handlePosition);

search("New York");
