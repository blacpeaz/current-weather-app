// Day and Time
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let today = days[currentTime.getDay()];
let day = document.querySelector("#day");
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
day.innerHTML = `${today} ${hour}:${minutes}`;

function showWeatherForecast(response) {
  console.log(response.data);
  let weatherForecast = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
          <img src="images/sunny.png" alt="" width="42" />
            <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max"> 18° </span>
                <span class="weather-forecast-temp-min"> 12° </span>
            </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function getCoordinates(coordinates) {
  console.log(coordinates);
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let lat = coordinates.lat;
  let lon = coordinates.lon;

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

//Temp Display & its properties
function showTemperature(response) {
  let tempNum = document.querySelector("#temp-num");
  let heading = document.querySelector("h1");
  let precipitation = document.querySelector("#precipitation");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  let description = document.querySelector("#description");
  celsiusTemp = response.data.main.temp;

  tempNum.innerHTML = Math.round(response.data.main.temp);
  heading.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} Km/H`;
  precipitation.innerHTML = `Precipitation: ${Math.round(response.data.rain)}`;
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getCoordinates(response.data.coord);
}

// Getting the input value
function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

// for calling API
function searchCity(city) {
  let apiKey = "ce144f0cf51fa43f03431f0488a36728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

//current temp
function retrievePosition(position) {
  let apiKey = "ce144f0cf51fa43f03431f0488a36728";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let heading = document.querySelector("h1");
  heading.innerHTML = "Antananarivo";

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

// units
//Celsius
function celsius(event) {
  event.preventDefault();
  degreeCelsius.classList.add("active");
  degreeFahrenheit.classList.remove("active");
  let tempNum = document.querySelector("#temp-num");
  tempNum.innerHTML = Math.round(celsiusTemp);
}

// Fahrenheit
function fahrenheit(event) {
  event.preventDefault();
  degreeCelsius.classList.remove("active");
  degreeFahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempNum = document.querySelector("#temp-num");
  tempNum.innerHTML = Math.round(fahrenheitTemp);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", showCurrentTemp);

let celsiusTemp = null;

let inputForm = document.querySelector("#input-form");
inputForm.addEventListener("submit", displayCity);

let degreeCelsius = document.querySelector("#degree-celsius");
degreeCelsius.addEventListener("click", celsius);

let degreeFahrenheit = document.querySelector("#degree-fahrenheit");
degreeFahrenheit.addEventListener("click", fahrenheit);

searchCity("Antananarivo");
