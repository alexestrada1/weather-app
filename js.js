//https://api.openweathermap.org/data/2.5/weather?q=Arkansas&APPID=d62e809d2d4a2ab30ba64bf5f2c7b934

//where our info will go
const weatherInfo = document.querySelector(".card");

const cityName = document.querySelector(".city");
const weatherCondition = document.querySelector(".weather-condition");
const temperature = document.querySelector(".temp");
const unit = document.querySelector('.unit')
const feelsLike = document.querySelector(".feels");
const max = document.querySelector(".tempMax");
const humidity = document.querySelector(".humidity");
const deg = document.querySelector(".degree");
const btn = document.querySelector(".search");
const input = document.querySelector(".city-name");
const slider = document.querySelector(".toggleF");

getWeather("Arkansas");
btn.addEventListener("click", () => {
  getWeather(input.value);
});
slider.addEventListener("click", () => {
    toggleFarenheight();
  })

async function getWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=d62e809d2d4a2ab30ba64bf5f2c7b934`,
    { mode: "cors" }
  );
  const data = await response.json();
  const name = data.name;
  const temp = data.main.temp;
  const feels = data.main.feels_like;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const tempMax = data.main.temp_max;
  loadDOM(name, temp, feels, description, humidity, tempMax);
}

async function toggleFarenheight() {
  let location = cityName.textContent;
  let unit = checkState();
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&APPID=d62e809d2d4a2ab30ba64bf5f2c7b934`,
    { mode: "cors" }
  );
  const data = await response.json();
  const name = data.name;
  const temp = data.main.temp;
  const feels = data.main.feels_like;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const tempMax = data.main.temp_max;
  loadDOM(name, temp, feels, description, humidity, tempMax);
  setUnit()
}
const checkState = () => {
    if (slider.checked === true){
      x = "imperial"
      return x;
    } else if (slider.checked === false) {
      x = "metric"
      return x;
    };
  };
  const setUnit = () => {
    if(slider.checked === true){
      unit.textContent = "°F"
    } else if (slider.checked === false){
      unit.textContent = "°C"
    }
};
  
function loadDOM(name, temp, feels, description, hum, tempMax) {
  cityName.textContent = name;
  temperature.textContent = Math.round(temp);
  unit.textContent = "°C"
  feelsLike.textContent = "Feels Like: " + Math.round(feels) + "°";
  weatherCondition.textContent = description;
  humidity.textContent = "Humidity: " + hum + "%";
  max.textContent = "Today's high: " + Math.round(tempMax) + "°";
}
