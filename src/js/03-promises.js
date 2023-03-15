// Бібліотека для відображення повідомлень користувачеві
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Посилання на елементи
const formEl = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');

// Слухач подій
formEl.addEventListener('submit', onSubmitBtnClick);

// Запуск createPromise по кліку
function onSubmitBtnClick(e) {
  e.preventDefault(); // Заборона перезавантаження сторінки

  for (let i = 0; i < amountInput.value; i += 1) {
    const position = i + 1;
    const delay = Number(delayInput.value) + i * Number(stepInput.value);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

  formEl.reset(); // Очищення форми
}

// Функція, що створює Promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
