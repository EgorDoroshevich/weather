import { weatherRain } from "./weatherVideo";
const { data, get } = require("jquery");

let formBtn = document.querySelector(".form__btn");
let temp = document.querySelector(".city__temp");
let description = document.querySelector(".city__description");
let cityName = document.querySelector(".city__name");
let searchInput = document.querySelector(".search__item__input");
let searchOption = document.querySelector(".options");
let serchIn = document.querySelector(".search__in");
let location = document.querySelector(".search__location");
let mainSearch = document.querySelector(".main__search");
let tenDays = document.querySelectorAll(".card__day__name");
let feelsLike = document.querySelector(".card__item__body");
let humidity = document.querySelector(".card__item__hum");
let sunset = document.querySelector(".card__item__sunset");
let sunrise = document.querySelector(".card__item__sunrise");
let visibl = document.querySelector(".card__item__visibl");
let times = document.querySelectorAll(".time");
let icons = document.querySelectorAll(".head__icon");
let temps = document.querySelectorAll(".head__temp");
let minTemps = document.querySelectorAll(".min__temp");
let maxTemps = document.querySelectorAll(".max__temp");
let tenIcons = document.querySelectorAll(".img__icon");
let videoRain = document.querySelector(".video__rain");
let videoClouds = document.querySelector(".video__clouds");
let videoOblachno = document.querySelector(".video__oblachno");
let videoSunny = document.querySelector(".video__sunny");
let mainMenu = document.querySelector(".main__menu");
let krest = document.querySelector(".krest");
let error = document.querySelector(".error");
let aside = document.querySelector('.card__aside');

formBtn.addEventListener("click", function () {
  error.innerHTML = "";
  mainSearch.classList.toggle("active");
  if ((mainSearch.classList = "main__search active")) {
    mainMenu.style.filter = "blur(3px)";
    location.style.filter = "blur(3px)";
    formBtn.style.filter = "blur(3px)";
  }
});
serchIn.addEventListener("click", () => {
  error.innerHTML = "";
  mainSearch.classList.toggle("active");
  mainMenu.style.filter = "none";
  location.style.filter = "none";
  formBtn.style.filter = "none";
  weatherNow(searchInput.value);
  weatherTenDay(searchInput.value);
  searchInput.value = "";
  location.innerHTML = addCard();
  addCard();
});
krest.addEventListener("click", () => {
  mainSearch.classList.remove("active");
  mainMenu.style.filter = "none";
  location.style.filter = "none";
  formBtn.style.filter = "none";
  weatherNow(searchInput.value);
  weatherTenDay(searchInput.value);
  searchInput.value = "";
  location.innerHTML = addCard();
  addCard();
});

const date = new Date();
const options = { weekday: "long" };
const dayOfWeek = date.toLocaleString("en-US", options);

let days = [
  "Sunday",
  "Monday",
  "Tuesday ",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function weekDay() {
  days.filter((el, idx) => {
    if (dayOfWeek == el) {
      let dni = days.slice(idx, idx + 5);
      dni.forEach((element, id) => {
        tenDays.forEach((elem, index) => {
          if (id === index) {
            elem.innerHTML = element;
          }
        });
      });
    }
  });
}
weekDay();

function getHoursString(dateTime) {
  let date = new Date(dateTime);
  let hours = `${date.getHours()}:${date.getMinutes()}${date.getMinutes()}`;
  return hours;
}

function getHours(data) {
  let date = new Date(data);
  let hours = ` ${date.getHours()}:${date.getMinutes()}`;
  return hours;
}

const apiKey = "6c75935c4cd7d533d00015e611a56556";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

async function weatherNow(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();
  temp.innerHTML = Math.round(data.main.temp) + "&#8451";
  description.innerHTML = data.weather.map((item) => item.description);
  cityName.innerHTML = data.name;
  location.innerHTML += addCard(data);
  feelLike(data);
  humidit(data);
  sunSet(data);
  visibility(data);
  sunRise(data);

  function weather() {
    if (data.rain) {
      videoRain.style.display = "block";
      videoClouds.style.display = "none";
      videoOblachno.style.display = "none";
      videoSunny.style.display = "none";
    } else if (data.weather[0].main == "Clouds" && data.wind.speed >= "5") {
      videoRain.style.display = "none";
      videoClouds.style.display = "block";
      videoOblachno.style.display = "none";
      videoSunny.style.display = "none";
    } else if (data.weather[0].main == "Clouds") {
      videoRain.style.display = "none";
      videoClouds.style.display = "none";
      videoOblachno.style.display = "block";
      videoSunny.style.display = "none";
    } else if (data.weather[0].main == "Clear") {
      videoRain.style.display = "none";
      videoClouds.style.display = "none";
      videoOblachno.style.display = "none";
      videoSunny.style.display = "block";
    } else {
      videoRain.style.display = "none";
      videoClouds.style.display = "none";
      videoOblachno.style.display = "none";
      videoSunny.style.display = "none";
    }
  }
  weather();
}

const nameCity = [];
const api = `https://api.hh.ru/areas`;
fetch(api)
  .then((res) => res.json())
  .then((data) => {
    console.log("data >>> ", data);
    data.forEach((el) => {
      nameCity.push(...el.areas);
    });
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

async function weatherTenDay(city) {
  const apiTenDayUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}`;
  const response = await fetch(apiTenDayUrl + `&appid=${apiKey}`);
  const data = await response.json();
  console.log(data, "data");

  let array = [];
  let base = [];
  let arrayMin = data.list.slice();
  let arrayMax = data.list.slice();
  function minNumber() {
    let one = arrayMin.splice(0, 8);
    one.forEach((elem) => {
      let oneDay = elem.main.temp_min;
      array.push(oneDay);
      return oneDay;
    });
    let sum = array.reduce((x, y) => Math.min(x, y));
    return sum;
  }
  function maxNumber() {
    let one = arrayMax.splice(0, 8);
    one.forEach((elem) => {
      let oneDay = elem.main.temp_max;
      base.push(oneDay);
      return oneDay;
    });
    let sum = base.reduce((x, y) => Math.max(x, y));
    return sum;
  }
  ///////////////////////
  ///////////
  let arrik = [];
  let ghy = [];

  function getTenIcon() {
    data.list.forEach((el, idx) => {
      tenIcons.forEach((elem, index) => {
        if (idx === index) {
          elem.innerHTML = `<img src = "http://openweathermap.org/img/w/${el.weather[0].icon}.png" alt = "#">`;
        }
      });
    });
  }

  getTenIcon();
  /////////////
  //////////

  function getMinTemp() {
    data.list.forEach((elem, idx) => {
      minTemps.forEach((el, id) => {
        if (idx === id) {
          el.innerHTML = Math.round(minNumber()) + "&#8451";
        }
      });
    });
  }
  getMinTemp();

  function getMaxTemp() {
    data.list.forEach((elem, idx) => {
      maxTemps.forEach((el, id) => {
        if (idx === id) {
          el.innerHTML = Math.round(maxNumber()) + "&#8451";
        }
      });
    });
  }
  getMaxTemp();
  function getTime(data) {
    data.list.forEach((el, idx) => {
      times.forEach((elem, id) => {
        if (idx === id) {
          elem.innerHTML = getHoursString(el.dt * 1000);
        }
      });
    });
  }
  getTime(data);

  function getIcon() {
    data.list.forEach((el, idx) => {
      icons.forEach((elem, id) => {
        if (idx === id) {
          elem.innerHTML = `<img src = "http://openweathermap.org/img/w/${el.weather[0].icon}.png" alt = "#">`;
        }
      });
    });
  }
  getIcon();
  function getTemp() {
    data.list.forEach((el, idx) => {
      temps.forEach((elem, id) => {
        if (idx === id) {
          elem.innerHTML = Math.round(el.main.temp) + "&#8451";
        }
      });
    });
  }
  getTemp();
}

function feelLike(data) {
  feelsLike.innerHTML = Math.round(data.main.feels_like) + "&#8451";
}
function humidit(data) {
  humidity.innerHTML = data.main.humidity + "%";
}
function sunSet(data) {
  sunset.innerHTML = getHours(data.sys.sunset * 1000);
}
function visibility(data) {
  visibl.innerHTML = data.visibility / 1000 + "KM";
}
function sunRise(data) {
  sunrise.innerHTML = getHours(data.sys.sunrise * 1000);
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
