// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Посилання на елементи
const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// Кнопка неактивна по замовчуванню
startBtn.disabled = true;

let deadline;
let timerId = null;

// Об'єкт параметрів
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deadline = selectedDates[0].getTime();

    if (deadline > options.defaultDate.getTime()) {
      startBtn.disabled = false;
    } else {
      alert('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
};

// Ініціалізація бібліотеки
flatpickr(inputEl, options);

// Слухач подій
startBtn.addEventListener('click', onStartBtnClick);

// Запуск таймера по кліку
function onStartBtnClick() {
  timerId = setInterval(timer, 1000);
  startBtn.disabled = true;
}

// Таймер
function timer() {
  const today = Date.now();
  const delta = deadline - today;
  const timer = convertMs(delta);

  daysEl.textContent = addLeadingZero(timer.days);
  hoursEl.textContent = addLeadingZero(timer.hours);
  minutesEl.textContent = addLeadingZero(timer.minutes);
  secondsEl.textContent = addLeadingZero(timer.seconds);

  if (delta < 1000) {
    clearInterval(timerId);
  }
}

// Конвертація часу
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Редагування відображення часу у формат '00'
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
