let display = document.getElementById("display");
let startStopBtn = document.getElementById("startStop");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let laps = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

function pad(num) {
  return num.toString().padStart(2, "0");
}

function displayTime(time) {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
  }, 250); // smoother updates than 1000ms
}

function pauseTimer() {
  clearInterval(timerInterval);
}

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    startStopBtn.innerText = "Pause";
    isRunning = true;
  } else {
    pauseTimer();
    startStopBtn.innerText = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  pauseTimer();
  elapsedTime = 0;
  displayTime(elapsedTime);
  isRunning = false;
  startStopBtn.innerText = "Start";
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const lapTime = display.innerText;
    const p = document.createElement("p");
    p.innerText = `Lap: ${lapTime}`;
    laps.prepend(p);
  }
});

