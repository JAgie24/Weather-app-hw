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

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  days.forEach(function (day) {
    let forecastHtml =
      forecastHtml +
      `   <div class="day">${day}</div>
            <div class="icon">⛅️</div>
            <div class="temperature">
              <span class="max">12</span>
              <span class="min">5</span>`;
  });

  forecast.innerHTML = forecastHtml;
}

displayForecast();
