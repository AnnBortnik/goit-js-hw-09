function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let bodyColor = null;

stopButton.setAttribute('disabled', '');

function setColor() {
    startButton.setAttribute('disabled', '')
    stopButton.removeAttribute('disabled')
     bodyColor = setInterval(() => {
        const color = getRandomHexColor();
        body.style.backgroundColor = `${color}`;
      }, 1000) 
}

function clear() {
    clearInterval(bodyColor);
    startButton.removeAttribute('disabled')
    stopButton.setAttribute('disabled', '')
}

startButton.addEventListener('click', setColor);

stopButton.addEventListener('click', clear);