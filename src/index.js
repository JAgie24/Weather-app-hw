function search(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let city = document.querySelector("#search-input");
  h1.innerHTML = city.value;
  let apiKey = "9afb40e8o55c131680361805450t0f39";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

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

function showTemp(response) {
  let temperature = response.data.temperature.current;
  let temperatureValue = document.querySelector(".current-temperature-value");
  temperatureValue.innerHTML = Math.round(temperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
