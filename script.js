const timer = document.querySelector('.timer')
const title = document.querySelector('.title')
const startBtn = document.querySelector('.startBtn')
const resumeBtn = document.querySelector('.resumeBtn')
const pauseBtn = document.querySelector('.pauseBtn')
const resetBtn = document.querySelector('.resetBtn')

const WORK_TIME = 25 * 60
const BREAK_TIME = 5 * 60

// Function to countDown
const counter = (time) => {
    timer.textContent = time
}
//Arrow Function to start timer
const startTimer = (startTimer) => {
    setInterval(counter(startTimer), 1000)
}

// Adding event listening to start button
startBtn.addEventListener('click', ()=>{
    startTimer(WORK_TIME)
})