let videoRain = document.querySelector(".video__rain");
let videoClouds = document.querySelector(".video__clouds");
let videoCloudy = document.querySelector(".video__cloudy");
let videoSunny = document.querySelector(".video__sunny");


export function setVideoBackgroundWeather(data) {
  if (data.rain) {
    videoRain.style.display = "block";
    videoClouds.style.display = "none";
    videoCloudy.style.display = "none";
    videoSunny.style.display = "none";
  } else if (data.weather[0].main == "Clouds" && data.wind.speed >= "5") {
    videoRain.style.display = "none";
    videoClouds.style.display = "block";
    videoCloudy.style.display = "none";
    videoSunny.style.display = "none";
  } else if (data.weather[0].main == "Clouds") {
    videoRain.style.display = "none";
    videoClouds.style.display = "none";
    videoCloudy.style.display = "block";
    videoSunny.style.display = "none";
  } else if (data.weather[0].main == "Clear") {
    videoRain.style.display = "none";
    videoClouds.style.display = "none";
    videoCloudy.style.display = "none";
    videoSunny.style.display = "block";
  } else {
    videoRain.style.display = "none";
    videoClouds.style.display = "none";
    videoCloudy.style.display = "none";
    videoSunny.style.display = "none";
  }
}
