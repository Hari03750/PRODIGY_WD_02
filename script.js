let [hours, minutes, seconds] = [0, 0, 0];
let display = document.getElementById("display");
let startStopBtn = document.getElementById("startStop");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let laps = document.getElementById("laps");

let timer = null;
let isRunning = false;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    timer = setInterval(stopwatch, 1000);
    startStopBtn.innerText = "Pause";
    isRunning = true;
  } else {
    clearInterval(timer);
    startStopBtn.innerText = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  startStopBtn.innerText = "Start";
  isRunning = false;
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
