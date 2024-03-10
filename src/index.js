function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-input");
  let city = cityElement.value;
  showCity(city);
}

function showCity(city) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let apiKey = "9afb40e8o55c131680361805450t0f39";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displaySearch);
}

showCity("Toronto");

function displaySearch(response) {
  let iconElement = document.querySelector(".current-temperature-icon");
  let icon = response.data.condition.icon_url;
  iconElement.innerHTML = `<img src="${icon}" class="current-temperature" />`;
  let temperature = response.data.temperature.current;
  let temperatureValue = document.querySelector(".current-temperature-value");
  temperatureValue.innerHTML = Math.round(temperature);
  let conditions = response.data.condition.description;
  let description = document.querySelector("#description");
  description.innerHTML = `, ${conditions}`;
  let humidity = response.data.temperature.humidity;
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `${humidity}%`;
  let windSpeed = response.data.wind.speed;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${windSpeed}km/h`;

  getForecast(response.data.city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function getForecast(city) {
  let apiKey = "9afb40e8o55c131680361805450t0f39";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `  <div class="forecast-day"> 
      <div class="day">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="forecast-icon" />
            <div class="temperature">
              <span class="max">${Math.round(day.temperature.maximum)}</span>
              <span class="min">${Math.round(day.temperature.minimum)}</span>
              </div>
              </div>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

displayForecast();
