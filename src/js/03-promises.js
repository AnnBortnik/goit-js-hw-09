import { Notify } from 'notiflix/build/notiflix-notify-aio';
const notifyOptions = { position: 'center-center', timeout: 10000 };

const formElement = document.querySelector('.form')

formElement.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault()
    const { delay, step, amount } = event.currentTarget.elements

    let delayValue = Number(delay.value);
    let stepValue = Number(step.value);
    let amountValue = Number(amount.value);
  
    for (let i = 1; i <= amountValue; i++) {
      createPromise(i, delayValue)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, notifyOptions);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, notifyOptions);
      });
      delayValue += stepValue;
    }
  }

  function createPromise(position, delay) {
    return new Promise(function (resolve, reject) {
      const shouldResolve = Math.random() > 0.3;
      const timerId = setTimeout(() => {
        if (shouldResolve) {
          // Resolved
          return resolve({ position, delay })
        } else {
          // Rejected
          return reject({ position, delay })
        }
      }, delay)
    })
  }

  