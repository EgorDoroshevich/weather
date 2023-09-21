const { data, get } = require("jquery");
import { weather, cardWeather} from "./weatherVideo";
import { weekDay } from "./weekDay";
import {
  feelLike,
  humidit,
  sunRise,
  sunSet,
  visibility,
} from "./ additionally";

let formBtn = document.querySelector(".form__btn");
let temp = document.querySelector(".city__temp");
let description = document.querySelector(".city__description");
let cityName = document.querySelector(".city__name");
let searchInput = document.querySelector(".search__item__input");
let searchOption = document.querySelector(".options");
let serchIn = document.querySelector(".search__in");
let location = document.querySelector(".search__location");
let mainSearch = document.querySelector(".main__search");
let mainMenu = document.querySelector(".main__menu");
let times = document.querySelectorAll(".time");
let icons = document.querySelectorAll(".head__icon");
let temps = document.querySelectorAll(".head__temp");
let minTemps = document.querySelectorAll(".min__temp");
let maxTemps = document.querySelectorAll(".max__temp");
let tenIcons = document.querySelectorAll(".img__icon");
let krest = document.querySelector(".krest");
let error = document.querySelector(".error");

export function getHoursString(dateTime) {
  let date = new Date(dateTime);
  let hours = `${date.getHours()}:${date.getMinutes()}${date.getMinutes()}`;
  return hours;
}
export function getHours(data) {
  let date = new Date(data);
  let hours = ` ${date.getHours()}:${date.getMinutes()}`;
  return hours;
}

function init(){
const validation = {
  city: "Введите название города",
  noneCity: "Ваш город не найден",
};
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
  if (searchInput.value == "") {
    searchInput.style.border = " 1px solid red";
    error.style.display = "block";
    error.innerHTML = validation.city;
    mainMenu.style.filter = "blur(3px)";
    location.style.filter = "blur(3px)";
    formBtn.style.filter = "blur(3px)";
  } 
  else {
    error.style.display = "none";
    searchInput.style.border = " 1px solid rgba(0, 148, 255, 0.15)";
    mainSearch.classList.toggle("active");
    mainMenu.style.filter = "none";
    location.style.filter = "none";
    formBtn.style.filter = "none";
    weatherNow(searchInput.value);
    weatherTenDay(searchInput.value);
    searchInput.value = "";
    location.innerHTML = addCard();
    addCard();
  }
});
krest.addEventListener("click", () => {
  error.style.display = "none";
  searchInput.style.border = " 1px solid rgba(0, 148, 255, 0.15)";
  mainSearch.classList.remove("active");
  mainMenu.style.filter = "none";
  location.style.filter = "none";
  formBtn.style.filter = "none";
  searchInput.value = "";
});

weekDay();
const apiKey = "6c75935c4cd7d533d00015e611a56556";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
async function weatherNow(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();
  if(data.cod == "200"){
    temp.innerHTML = Math.round(data.main.temp) + "&#8451";
  description.innerHTML = data.weather.map((item) => item.description);
  cityName.innerHTML = data.name;
  location.innerHTML += addCard(data);
  feelLike(data);
  humidit(data);
  sunSet(data);
  visibility(data);
  sunRise(data);
  weather(data);
  }
  else{
    mainSearch.classList.toggle("active");
    searchInput.style.border = " 1px solid red";
    error.style.display = "block";
    error.innerHTML = validation.noneCity;
    mainMenu.style.filter = "blur(3px)";
    location.style.filter = "blur(3px)";
    formBtn.style.filter = "blur(3px)";
  }
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
  function getMaxTemp() {
    data.list.forEach((elem, idx) => {
      maxTemps.forEach((el, id) => {
        if (idx === id) {
          el.innerHTML = Math.round(maxNumber()) + "&#8451";
        }
      });
    });
  }
  function getMinTemp() {
    data.list.forEach((elem, idx) => {
      minTemps.forEach((el, id) => {
        if (idx === id) {
          el.innerHTML = Math.round(minNumber()) + "&#8451";
        }
      });
    });
  }
  function getTemp() {
    data.list.forEach((el, idx) => {
      temps.forEach((elem, id) => {
        if (idx === id) {
          elem.innerHTML = Math.round(el.main.temp) + "&#8451";
        }
      });
    });
  }
  function getIcon() {
    data.list.forEach((el, idx) => {
      icons.forEach((elem, id) => {
        if (idx === id) {
          elem.innerHTML = `<img src = "http://openweathermap.org/img/w/${el.weather[0].icon}.png" alt = "#">`;
        }
      });
    });
  }
  function getTime() {
    data.list.forEach((el, idx) => {
      times.forEach((elem, id) => {
        if (idx === id) {
          elem.innerHTML = getHoursString(el.dt * 1000);
        }
      });
    });
  }
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
  getTime();
  getIcon();
  getTemp();
  getMinTemp();
  getMaxTemp();
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
}
init();