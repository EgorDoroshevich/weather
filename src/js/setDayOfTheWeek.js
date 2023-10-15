let fiveDays = document.querySelectorAll(".card__day__name");

const date = new Date();
const options = { weekday: "long" };
const dayOfWeek = date.toLocaleString("en-US", options);

let daysOfWeek = [
  "Monday",
  "Tuesday ",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function setDayOfTheWeek() {
  daysOfWeek.forEach((el, idx) => {
    if (dayOfWeek === el) {
      let selectedDaysOfWeek = daysOfWeek.slice(idx, idx + 5);
      selectedDaysOfWeek.forEach((element, id) => {
        fiveDays.forEach((elem, index) => {
          if (id === index) {
            elem.innerHTML = element;
          }
        });
      });
    }
  });
}
