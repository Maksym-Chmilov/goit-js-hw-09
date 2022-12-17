const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

let timerId = 0;

refs.start.addEventListener('click', onButtonClickChangeColor);
refs.stop.addEventListener('click', onButtonClickStopChangeColor);

function onButtonClickChangeColor() {
  timerId = setInterval(getRandomBgColor, 1000);

  refs.start.disabled = true;
  refs.stop.disabled = false;
};

function onButtonClickStopChangeColor() {
  clearInterval(timerId);

  refs.stop.disabled = true;
  refs.start.disabled = false;
};

function getRandomBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
