import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const body = document.querySelector("body");
const inputEl = body.querySelector("#datetime-picker");
const btnStart = body.querySelector("button[data-start]");
const timer = body.querySelector(".timer");
const day = body.querySelector(".value[data-days]");
const hour = body.querySelector(".value[data-hours]");
const minute = body.querySelector(".value[data-minutes]");
const second = body.querySelector(".value[data-seconds]");

timer.style.display = "flex";
timer.style.gap = "20px";
timer.style.marginTop = "30px";
timer.style.fontSize = "20px";

btnStart.disabled = true;
let intervalId = null;
let startTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      btnStart.disabled = true;
      Notify.failure("Please choose a date in the future");
      return;
    }
    btnStart.disabled = false;

    startTime = selectedDates[0];
  },
};

flatpickr("#datetime-picker", options);


btnStart.addEventListener("click", onClickBtnStart)
  
function onClickBtnStart() {
  inputEl.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = startTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    day.textContent = days;
    hour.textContent = hours;
    minute.textContent = minutes;
    second.textContent = seconds;

    if (deltaTime <= 1000) {
      clearInterval(intervalId);
      Notify.success("Countdown finished");
      inputEl.disabled = false;
    }
  }, 1000);

  btnStart.disabled = true;
};


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
};
