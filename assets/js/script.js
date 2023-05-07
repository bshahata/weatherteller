function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ];

  let day = days[date.getDay()];
  return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0{minutes}`;
  }

  return `${hours}${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  DataElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("");
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <p class="future_times">${formatHours(forecast.dt * 1000)}</p>
      <img 
      class="weather-icon-images"
      width="50px"
      src=""
      alt=""
      />
      <p class="future_times"><strong>${Math.round(
        forecast.main.temp_max
      )}</strong> ${Mathround(forecast.main.temp_min)}</p>
      </div>
      `;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeBackground() {
  let backgroundImageElement = document.querySelector("#background-image");
  let date = new Date();
  let hours = date.getHours();
  if (hours < 12) {
    backgroundImageElement.setAttribute("");
  } else if (hours < 20) {
    backgroundImageElement.setAttribute("");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search("");
changeBackground();