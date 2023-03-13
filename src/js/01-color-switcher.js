// Посмлання на елементи
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

// Кнопка stop неактивна по замовчуванню
stopBtn.disabled = true;

// Ідентифікатор setInterval
let colorTimerId = null;

// Слухачі подій
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

// Функція, що запускає зміну кольору фону
function onStartBtnClick(e) {
  e.currentTarget.disabled = true;
  stopBtn.disabled = false;

  colorTimerId = setInterval(() => {
    const randomHexColor = getRandomHexColor();
    bodyEl.style.backgroundColor = randomHexColor;
  }, 1000);
}

// Функція, що зупиняє зміну кольору фону
function onStopBtnClick(e) {
  e.currentTarget.disabled = true;
  startBtn.disabled = false;

  clearInterval(colorTimerId);
}

// Генерація випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
