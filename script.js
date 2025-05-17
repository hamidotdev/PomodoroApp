const timer = document.querySelector('.timer')
const title = document.querySelector('.title')
const startBtn = document.querySelector('.startBtn')
const resumeBtn = document.querySelector('.resumeBtn')
const pauseBtn = document.querySelector('.pauseBtn')
const resetBtn = document.querySelector('.resetBtn')

// Making Variaables
const WORK_TIME = 1 * 60
const BREAK_TIME = 0.5 * 60

let timerID = null
let oneRoundCompleted = false; // One Round = Work Time + Break Time


// Function to update title
const 
// Function to countDown
const counter = (time) => {
    return () => {
        timer.textContent = time
        time --
        if(time < 0) {
            stopTimer()
            if (!oneRoundCompleted) {
                timerID = startTimer(BREAK_TIME)
                oneRoundCompleted = true
            }
        }
    }
}

//Arrow Function to start timer
const startTimer = (startTime) => {
    if(timerID !== null) {
     stopTimer()
    }
   return setInterval(counter(startTime), 1000);
}

// Arrow Function to stop timer
const stopTimer = () => {
    clearInterval(timerID); 
    timerID = null
}

// Adding event listening to start button
startBtn.addEventListener('click', ()=>{
    timerID = startTimer(WORK_TIME)
})