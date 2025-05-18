const timer = document.querySelector('.timer')
const title = document.querySelector('.title')
const startBtn = document.querySelector('.startBtn')
const resumeBtn = document.querySelector('.resumeBtn')
const pauseBtn = document.querySelector('.pauseBtn')
const resetBtn = document.querySelector('.resetBtn')
const count = document.querySelector('.count')
const pomoCountsDisplay = document.querySelector('.pomoCountsDisplay')

// Making Variaables
const WORK_TIME = 2 * 6
const BREAK_TIME = 1 * 60

let timerID = null
let oneRoundCompleted = false; // One Round = Work Time + Break Time
let totalCount = 0
let pause = false


// Function to update title
const updateTitle = (message) => {
    title.textContent = message
}

// Function to save Poodoro Count to local storage
const saveLogCounts = () => {
    let counts = JSON.parse(localStorage.getItem('pomoCounts'))
    console.log(counts);
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("pomoCounts", JSON.stringify(counts))
    console.log(counts);
}

// Function to countDown
const counter = (time) => {
    return () => {
        let mins = Math.floor(time/60).toString().padStart(2, '0')
        let secs = (time % 60).toString().padStart(2, '0')
        timer.textContent = `${mins}:${secs}`
        time --
        if(time < 0) {
            stopTimer()
            if (!oneRoundCompleted) {
                timerID = startTimer(BREAK_TIME)
                oneRoundCompleted = true
                updateTitle("It's Break Time!")
            } else {
                updateTitle("Completed 1 Round of Pomodoro Technique!")
                setTimeout( ()=> updateTitle("Start Timer Again!"), 5000)
                oneRoundCompleted = false
                totalCount++
                console.log(totalCount);
                saveLogCounts()
                showPomoCounts()
            }
        }
    }
}


// Function to get time in seconds
const getTimeInSecs = (timeString) =>  {
    const [minutes, seconds] = timeString.split(":")
    return parseInt(minutes * 60) + parseInt(seconds)
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
    timerID = startTimer(WORK_TIME);
    updateTitle(`It's Work Time!!`);
})

// Adding Event Listener to reset button
resetBtn.addEventListener('click', () => {
    stopTimer();
    timer.textContent = "25:00"
    localStorage.clear()
})

// Adding Event Listener to pause button
pauseBtn.addEventListener('click', () => {
    stopTimer();
    pause = true
    updateTitle(`Timer Paused!`)
})

// Adding Event Listener to resume button
resumeBtn.addEventListener('click', () => {
    if (pause) {
        const currentTime = getTimeInSecs(timer.textContent)
        timerID = startTimer(currentTime)
        pause = false;
        (!oneRoundCompleted) ? updateTitle("It's Work Time!!") : updateTitle("It's Break Time")
        console.log(oneRoundCompleted);
    }
})


// Function to show completed pomodoros to screen from local storage
const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem('pomoCounts'))
    console.log(counts);
    
    if (counts > 0) {
        pomoCountsDisplay.style.display = 'flex'
    }
    count.textContent = counts;
}

showPomoCounts()
