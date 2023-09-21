let videoRain = document.querySelector(".video__rain");
let videoClouds = document.querySelector(".video__clouds");
let videoOblachno = document.querySelector(".video__oblachno");
let videoSunny = document.querySelector(".video__sunny");
let videoCardRain = document.querySelector(".card__video__rain");
let videoCardClouds = document.querySelector(".card__video__clouds");
let videoCardOblachno = document.querySelector(".card__video__oblachno");
let videoCardSunny = document.querySelector(".card__video__sunny");

export function weather(data) {
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
