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
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".temperature");
  currentTemperature.innerHTML = `${temperature}`;

  document.querySelector(".description").innerHTML = response.data.weather[0].description;

  document.querySelector(".city").innerHTML = response.data.name;

  document.querySelector(".date").innerHTML = formatDate(response.data.dt * 1000);

  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes =date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  day = days[day];
  return(`Last updated at ${day} ${hours}:${minutes}`);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

search("New York");
