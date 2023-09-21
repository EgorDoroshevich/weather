let tenDays = document.querySelectorAll(".card__day__name");

const date = new Date();
const options = { weekday: "long" };
const dayOfWeek = date.toLocaleString("en-US", options);

let days = [
  "Monday",
  "Tuesday ",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function weekDay() {
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
