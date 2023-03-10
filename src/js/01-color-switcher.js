const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let colorTimerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {
  e.currentTarget.disabled = true;
  stopBtn.disabled = false;

  colorTimerId = setInterval(() => {
    const randomHexColor = getRandomHexColor();
    bodyEl.style.backgroundColor = randomHexColor;
  }, 1000);
}

function onStopBtnClick(e) {
  e.currentTarget.disabled = true;
  startBtn.disabled = false;

  clearInterval(colorTimerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
