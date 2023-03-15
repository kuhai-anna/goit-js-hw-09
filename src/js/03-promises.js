// Бібліотека для відображення повідомлень користувачеві
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Посилання на форму
const formEl = document.querySelector('.form');

// Слухач подій
formEl.addEventListener('submit', onSubmitBtnClick);

// Запуск createPromise по кліку
function onSubmitBtnClick(e) {
  e.preventDefault(); // Заборона перезавантаження сторінки

  const form = e.currentTarget;
  const amount = form.elements.amount.value;
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const newDelay = delay + i * step;

    createPromise(position, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      .finally(() => {
        formEl.reset();
      }); // Очищення форми
  }
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
