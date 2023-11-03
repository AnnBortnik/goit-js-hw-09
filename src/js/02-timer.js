// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Report } from 'notiflix/build/notiflix-report-aio';

const inputElement = document.querySelector('input#datetime-picker');
const button = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
let timerElement = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
      onClose(selectedDates) {
          if (selectedDates[0].getTime() <= Date.now()) {
              Report.failure('Please choose a date in the future')
              
        }
          else {
              Report.success('Thank you! Press start');
              button.disabled = false;
        }
    },
};

function updTimer({ days = 0, hours = 0, minutes = 0, seconds = 0 } = {}) {
    daysElement.textContent = padStart(days);
    hoursElement.textContent = padStart(hours);
    minutesElement.textContent = padStart(minutes);
    secondsElement.textContent = padStart(seconds);
};

flatpickr(inputElement, options);

button.addEventListener(`click`, onClick);

function onClick() {
    let ms = new Date(inputElement.value).getTime() - Date.now();
    timerElement = setInterval(() => {
        ms -= 1000;
        if (ms <= 1000) {
            clearInterval(timerElement);
            updTimer();
        }
        const date = convertMs(ms);
        updTimer(date); 
    }, 1000);
}


function padStart(value) {
    return value.toString().padStart(2, '0')
}

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
