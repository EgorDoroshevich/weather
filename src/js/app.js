const { data, get } = require("jquery");
import { setVideoBackgroundWeather } from "./setVideoWeather";
import { setDayOfTheWeek } from "./setDayOfTheWeek";
import {
  setWeatherFeelLike,
  setHumidity,
  setSunSet,
  setVisibility,
  setSunRise,
} from "./additionally";

const searchBtn = document.querySelector(".search__btn");
const temperatureNow = document.querySelector(".city__temp");
const description = document.querySelector(".city__description");
const cityName = document.querySelector(".city__name");
const searchInput = document.querySelector(".search__item__input");
const searchOption = document.querySelector(".options");
const searchIn = document.querySelector(".search__in");
const location = document.querySelector(".search__location");
const mainSearch = document.querySelector(".main__search");
const mainMenu = document.querySelector(".main__menu");
const times = document.querySelectorAll(".time");
const icons = document.querySelectorAll(".head__icon");
const temps = document.querySelectorAll(".head__temp");
const minTemps = document.querySelectorAll(".min__temp");
const maxTemps = document.querySelectorAll(".max__temp");
const tenIcons = document.querySelectorAll(".img__icon");
const closePopup = document.querySelector(".close__popup");
const error = document.querySelector(".error");
const locationBurger = document.querySelector('.location__burger');

export function getHoursString(dateTime) {
  let date = new Date(dateTime);
  let hours = `${date.getHours()}:${date.getMinutes()}${date.getMinutes()}`;
  return hours;
}
export function getHours(data) {
  let date = new Date(data);
  let hours = `${date.getHours()}:${date.getMinutes()}`;
  return hours;
}

function init() {
  const VALIDATION = {
    emptyLine: "Введите название города",
    wrongName: "Ваш город не найден",
  };

  searchBtn.addEventListener("click", function () {
    error.innerHTML = "";
    mainSearch.classList.toggle("active");
    if (mainSearch.classList.contains("active")) {
      mainMenu.style.filter = "blur(3px)";
      location.style.filter = "blur(3px)";
      searchBtn.style.filter = "blur(3px)";
      locationBurger.style.filter = "blur(3px)";
    } else {
      error.innerHTML = "";
      mainMenu.style.filter = "none";
      location.style.filter = "none";
      searchBtn.style.filter = "none";
      locationBurger.style.filter = "none";
    }
  });
  searchIn.addEventListener("click", () => {
    if (searchInput.value === "") {
      searchInput.style.border = " 1px solid red";
      error.style.display = "block";
      error.innerHTML = VALIDATION.emptyLine;
      mainMenu.style.filter = "blur(3px)";
      location.style.filter = "blur(3px)";
      searchBtn.style.filter = "blur(3px)";
      locationBurger.style.filter = "blur(3px)";
    } else {
      error.style.display = "none";
      searchInput.style.border = " 1px solid rgba(0, 148, 255, 0.15)";
      mainSearch.classList.toggle("active");
      mainMenu.style.filter = "none";
      location.style.filter = "none";
      searchBtn.style.filter = "none";
      locationBurger.style.filter = "none";
      getWeatherNow(searchInput.value);
      getWeatherFiveDay(searchInput.value);
      searchInput.value = "";
      location.innerHTML = addCard();
      addCard();
    }
  });
  closePopup.addEventListener("click", () => {
    error.style.display = "none";
    searchInput.style.border = " 1px solid rgba(0, 148, 255, 0.15)";
    mainSearch.classList.remove("active");
    mainMenu.style.filter = "none";
    location.style.filter = "none";
    searchBtn.style.filter = "none";
    locationBurger.style.filter = "none";
    searchInput.value = "";
  });

  setDayOfTheWeek();

  const API_KEY = "6c75935c4cd7d533d00015e611a56556";
  const API_URL_WEATHER_NOW = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
  async function getWeatherNow(city) {
    const response = await fetch(
      API_URL_WEATHER_NOW + city + `&appid=${API_KEY}`
    );
    const data = await response.json();
    if (data.cod == "200") {
      temperatureNow.innerHTML = Math.round(data.main.temp) + "&#8451";
      description.innerHTML = data.weather.map((item) => item.description);
      cityName.innerHTML = data.name;
      location.innerHTML += addCard(data);
      setWeatherFeelLike(data);
      setHumidity(data);
      setSunSet(data);
      setVisibility(data);
      setSunRise(data);
      setVideoBackgroundWeather(data);
    } else {
      mainSearch.classList.toggle("active");
      searchInput.style.border = " 1px solid red";
      error.style.display = "block";
      error.innerHTML = VALIDATION.wrongName;
      mainMenu.style.filter = "blur(3px)";
      location.style.filter = "blur(3px)";
      searchBtn.style.filter = "blur(3px)";
    }
  }
  const nameCity = [];
  const API_AREAS = `https://api.hh.ru/areas`;
  fetch(API_AREAS)
    .then((res) => res.json())
    .then((data) => {
      console.log("data >>> ", data);
      try {
        data.forEach((el) => {
          nameCity.push(...el.areas);
        });
      } catch {
        console.log("Error");
      }
    });
  function getOptions(word, nameCity) {
    return nameCity.filter((s) => {
      const regex = new RegExp(word, "gi");
      return s.name.match(regex);
    });
  }
  function displayOptions() {
    console.log("this.value >>>>", this.value);
    const options = getOptions(this.value, nameCity);
    const html = options
      .map((city) => {
        const regex = new RegExp(this.value, "gi");
        const cityNameHL = city.name.replace(
          regex,
          `<span class = "hl">${this.value}</span>`
        );
        return `<li><span>${cityNameHL}</span></li>`;
      })
      .slice(0, 10)
      .join("");
    searchOption.innerHTML = html;
    console.log("options >>>", options);
  }
  searchInput.addEventListener("change", displayOptions);
  searchInput.addEventListener("keyup", displayOptions);

  async function getWeatherFiveDay(city) {
    const API_FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}`;
    const response = await fetch(API_FIVE_DAY_URL + `&appid=${API_KEY}`);
    const data = await response.json();
    // console.log(data);

    let newArr = data.list.slice();
    function getMinimumTemperatureFiveDay() {
      let oneDayMinTemperature = [...newArr.splice(0, 8)];
      let minTemperature = oneDayMinTemperature
        .map((elem) => elem.main.temp_min)
        .reduce((x, y) => Math.min(x, y));
      return minTemperature;
    }
    function getMaximumTemperatureFiveDay() {
      let oneDayMaxTemperature = [...data.list.splice(0, 8)];
      let maxTemperature = oneDayMaxTemperature
        .map((elem) => elem.main.temp_max)
        .reduce((x, y) => Math.max(x, y));
      console.log(maxTemperature);
      return maxTemperature;
    }
    function setMaximumTemperature() {
      data.list.forEach((elem, idx) => {
        maxTemps.forEach((el, id) => {
          if (idx === id) {
            el.innerHTML =
              Math.round(getMaximumTemperatureFiveDay()) + "&#8451";
          }
        });
      });
    }
    function setMinimumTemperature() {
      data.list.forEach((elem, idx) => {
        minTemps.forEach((el, id) => {
          if (idx === id) {
            el.innerHTML =
              Math.round(getMinimumTemperatureFiveDay()) + "&#8451";
          }
        });
      });
    }
    function setTemperature() {
      data.list.forEach((el, idx) => {
        temps.forEach((elem, id) => {
          if (idx === id) {
            elem.innerHTML = Math.round(el.main.temp) + "&#8451";
          }
        });
      });
    }
    function setIcon() {
      data.list.forEach((el, idx) => {
        icons.forEach((elem, id) => {
          if (idx === id) {
            elem.innerHTML = `<img src = "http://openweathermap.org/img/w/${el.weather[0].icon}.png" alt = "#">`;
          }
        });
      });
    }
    function setTime() {
      data.list.forEach((el, idx) => {
        times.forEach((elem, id) => {
          if (idx === id) {
            elem.innerHTML = getHoursString(el.dt * 1000);
          }
        });
      });
    }
    function setFiveIcon() {
      data.list.forEach((el, idx) => {
        tenIcons.forEach((elem, index) => {
          if (idx === index) {
            elem.innerHTML = `<img src = "http://openweathermap.org/img/w/${el.weather[0].icon}.png" alt = "#">`;
          }
        });
      });
    }
    setFiveIcon();
    setTime();
    setIcon();
    setTemperature();
    setMinimumTemperature();
    setMaximumTemperature();
  }
}

function addCard(data) {
  return `<div class="card__aside">
  <div class="card__aside__left">
  <div class="card__aside__city">${data.name}</div> 
  <div class="card__aside__weather">${data.weather.map(
    (item) => item.description
  )}</div>
  </div>
  <div class="card__aside__right">
  <div class="card__aside__temp">${Math.round(data.main.temp) + "&#8451"}</div>
  </div>
</div>`;
}

let link = document.querySelector(".weather__burger__menu");
let weatherFiveDay = document.querySelector(".weather__teen__day");

link.addEventListener("click", function (e) {
  e.preventDefault;
  weatherFiveDay.classList.toggle("active");
  link.classList.toggle("active");
});

let cityBurgerMenu = document.querySelector(".location__burger__menu");
let searchLocationCard = document.querySelector(".search__location");

cityBurgerMenu.addEventListener("click", function (e) {
  e.preventDefault;
  cityBurgerMenu.classList.toggle("active");
  searchLocationCard.classList.toggle("active");
});

init();
