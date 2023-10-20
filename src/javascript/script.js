const timerEl = document.getElementById('timer');
const marklist = document.getElementById('mark-list');
let intervalId = 0; // Correção do nome da variável
let timer = 0;
let marks = [];

const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const addMarkToList = (markindex, marktime) => {
    marklist.innerHTML += `<p>Marca ${markindex}: ${formatTime(marktime)}</p>`;
}

const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
}

const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalId); // Correção do nome da variável

    if (action == 'start' || action == 'continue') {
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const resetTime = () => { // Adicionada a função resetTime
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marklist.innerHTML = '';
    const button = document.getElementById('power');
    button.setAttribute('action', 'start'); // Correção na definição do atributo
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
}

document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTime); // Adicionado o evento de reset