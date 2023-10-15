import { getHours } from "./app";
let feelsLike = document.querySelector(".card__item__body");
let humidity = document.querySelector(".card__item__hum");
let sunset = document.querySelector(".card__item__sunset");
let sunrise = document.querySelector(".card__item__sunrise");
let visibl = document.querySelector(".card__item__visibl");

 
export function setWeatherFeelLike(data) {
  feelsLike.innerHTML = Math.round(data.main.feels_like) + "&#8451";
}
export function setHumidity(data) {
  humidity.innerHTML = data.main.humidity + "%";
}
export function setSunSet(data) {
  sunset.innerHTML = getHours(data.sys.sunset * 1000);
}
export function setVisibility(data) {
  visibl.innerHTML = data.visibility / 1000 + "KM";
}
export function setSunRise(data) {
  sunrise.innerHTML = getHours(data.sys.sunrise * 1000);
}
