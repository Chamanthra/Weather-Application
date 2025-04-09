const apiKey = "c9f4e4c1de13be875d99f6349ed4e1cf"; // Replace with your OpenWeather API key
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// Function to fetch weather data by city name
async function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert("City not found. Please try again.");
    }
}

// Function to fetch weather data by user's location
async function getWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert("Unable to fetch weather data.");
    }
}

// Function to display weather data
function displayWeather(data) {
    temp.textContent = `${data.main.temp}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeatherByCity(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Event listener for the location button
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByLocation(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});