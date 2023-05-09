// ~ Date & Time ~

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
// ~ Location & Temp Change ~

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  
  const apiKey = "cda72f3c7c530e516513a2cf17943612";
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);



  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// ~ Forecast ~

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
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      alt=""
    />
    <p class="future_temps"><strong>${Math.round(
      forecast.main.temp_max
    )}°</strong> ${Math.round(forecast.main.temp_min)}°</p>
   </div>
   `;
  }
}

// ~ Search City ~

function search(city) {
  let apiKey = "cda72f3c7c530e516513a2cf17943612";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

// ~ Celcius/Fahrenheit ~

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

// ~ Changing Background ~

// function changeBackground() {
//   let backgroundImageElement = document.querySelector("#background-image");
//   let date = new Date();
//   let hours = date.getHours();
//   if (hours < 12) {
//     backgroundImageElement.setAttribute(
//       "src",
//       "./images/backgroundImg.jpg"
//     );
//   // } else if (hours < 20) {
//   //   backgroundImageElement.setAttribute(
//   //     "src",
//   //     "https://i.ibb.co/56Jyd9q/weatherbackground2.png"
//   //   );
//   // } else {
//   //   backgroundImageElement.setAttribute(
//   //     "src",
//   //     "https://i.ibb.co/kJqVRNz/weatherbackground3.png"
//   //   );
//   }
// }

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("Orlando");
// changeBackground();