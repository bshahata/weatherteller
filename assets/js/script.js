// Set API key and base URL
const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

// Select HTML elements
const searchInput = document.getElementById('searchInput');
const currentSection = document.getElementById('current-section');
const previousSection = document.getElementById('previous-section');
const futureSection = document.getElementById('future-section');

// Event listener for search input
searchInput.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) { // Enter key
    searchWeather(searchInput.value);
  }
});

// Function to fetch weather data
function searchWeather(query) {
  const endpoint = `${baseUrl}weather?q=${query}&appid=${apiKey}&units=metric`;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateCurrentWeather(data);
      searchForecast(data.coord);
    })
    .catch(error => {
      console.error(error);
      alert('Unable to get weather data. Please try again.');
    });
}

// Function to update current weather section
function updateCurrentWeather(data) {
  const { name, weather, main, wind } = data;
  const icon = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
  const html = `
    <div class="card bg-secondary shadow-lg">
      <div class="card-body text-center">
        <h2 class="card-title">${name}</h2>
        <img src="${icon}" alt="${weather[0].description}" class="card-img">
        <h3 class="card-subtitle">${weather[0].description}</h3>
        <p class="card-text">${Math.round(main.temp)} &deg;C</p>
        <p class="card-text">Feels like ${Math.round(main.feels_like)} &deg;C</p>
        <p class="card-text">Humidity ${main.humidity}%</p>
        <p class="card-text">Wind ${wind.speed} m/s</p>
      </div>
    </div>`;
  currentSection.innerHTML = html;
}

// Function to fetch forecast data
function searchForecast(coord) {
  const endpoint = `${baseUrl}onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateForecast(data.daily);
    })
    .catch(error => {
      console.error(error);
      alert('Unable to get forecast data. Please try again.');
    });
}

// Function to update forecast sections
function updateForecast(forecastData) {
  let previousHtml = '';
  let futureHtml = '';
  for (let i = 1; i <= 3; i++) {
    const { dt, temp, weather } = forecastData[i];
    const icon = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
    const date = dayjs.unix(dt).format('ddd D MMM');
    const html = `
      <div class="card w-100 bg-info shadow-sm">
        <div class="card-body text-center">
          <h3 class="card-title">${date}</h3>
          <img src="${icon}" alt="${weather[0].description}" class="card-img">
          <h4 class="card-subtitle">${weather[0].description}</h4>
          <p class="card-text">${Math.round(temp.day)} &deg;C</p>
        </div> `
  }
};