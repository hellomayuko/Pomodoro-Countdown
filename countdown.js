let interval;
let isPaused = true;
let countdownWasStarted = false;
let timeLeftInSeconds = 0;

const secondsInaMinute = 60;
const minutes_25 = secondsInaMinute * 25;
const minutes_50 = secondsInaMinute * 50;

// Button Handlers
function playPauseCountdown() {
  isPaused = !isPaused

  updatePlayPauseButton();

  if(!countdownWasStarted) {
    resetCountdown()
    updateTimeString()
  }

  countdownWasStarted = true

  if(isPaused) {
    stopCountdown()
  } else {
    // Update the count down every 1 second
    interval = setInterval(updateCountdown, 1000);
  }
}

function restartCountdown() {
  stopCountdown()
  resetCountdown()

  isPaused = true
  updatePlayPauseButton()
  updateTimeString()
}

// Biz Logic
function updateCountdown() {
  if(isPaused) {
    return
  }

  timeLeftInSeconds--;

  updateTimeString();

  if(timeLeftInSeconds == 0) {
    playYoScott();
  }
}

function pauseCountdown() {
  isPaused = !isPaused;
}

function stopCountdown() {
  clearInterval(interval)
}

function resetCountdown() {
  isPaused = false
  timeLeftInSeconds = minutes_50
}

// View Updates
function updatePlayPauseButton() {
  let playPauseImageSrc;
  if(isPaused) {
    playPauseImageSrc = "playButton4x.png"
  } else {
    playPauseImageSrc = "pauseButton4x.png"
  }
  document.getElementById("playPause").src = playPauseImageSrc;
}

function updateTimeString() {
  let minutes = Math.floor(timeLeftInSeconds / secondsInaMinute);
  let seconds = timeLeftInSeconds % secondsInaMinute;

  if(seconds < 10) {
    secondsString = "0" + seconds
  } else {
    secondsString = seconds
  }

  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = minutes + ":" + secondsString;
}

function playYoScott() {
  var yoScottAudio = document.getElementById("yoScottAudio");
  yoScottAudio.play();

  document.getElementById("countdown").innerHTML = "YO SCOTT";
}
