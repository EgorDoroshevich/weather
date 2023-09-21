import { getHours } from "./app";
let feelsLike = document.querySelector(".card__item__body");
let humidity = document.querySelector(".card__item__hum");
let sunset = document.querySelector(".card__item__sunset");
let sunrise = document.querySelector(".card__item__sunrise");
let visibl = document.querySelector(".card__item__visibl");

export function feelLike(data) {
  feelsLike.innerHTML = Math.round(data.main.feels_like) + "&#8451";
}
export function humidit(data) {
  humidity.innerHTML = data.main.humidity + "%";
}
export function sunSet(data) {
  sunset.innerHTML = getHours(data.sys.sunset * 1000);
}
export function visibility(data) {
  visibl.innerHTML = data.visibility / 1000 + "KM";
}
export function sunRise(data) {
  sunrise.innerHTML = getHours(data.sys.sunrise * 1000);
}
