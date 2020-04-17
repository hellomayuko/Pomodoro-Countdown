let interval;
let countdownDate;
let isPaused = true;
let countdownDidStart = false;

function playPauseCountdown() {
  isPaused = !isPaused
  
  let playPauseImageSrc;
  if(isPaused) {
    playPauseImageSrc = "playButton4x.png"
  } else {
    playPauseImageSrc = "pauseButton4x.png"
  }
  document.getElementById("playPause").src = playPauseImageSrc;

  if(!countdownDidStart) {
    document.getElementById("countdown").innerHTML = "25:00";
    countDownDate = new Date();
    countDownDate.setMinutes(countDownDate.getMinutes()+25);
  }

  countdownDidStart = true

  // Update the count down every 1 second
  interval = setInterval(updateCountdown, 1000);
}

/**
 * TODO for next time:
 * 
 * The pause logic is buggy as heck, maybe instead of relying on dates to do the calculation,
 * just use an integer. updateCountdown() gets called every second, so we could decrement the
 * counter every time this function is called to make the math simpler. And when we're paused,
 * just don't do anything.
 */
function updateCountdown() {
  if(isPaused) {
    countDownDate.setSeconds(countDownDate.getSeconds() + 1)
    return
  }

  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  let secondsString = seconds;
  if(seconds < 10) {
    secondsString = "0" + seconds;
  }

  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = minutes + ":" + secondsString;

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(interval);
    var yoScottAudio = document.getElementById("yoScottAudio");
    yoScottAudio.play();

    document.getElementById("countdown").innerHTML = "YO SCOTT";
  }
}

function pauseCountdown() {
  if(isPaused) {
    //Current state: Resume
    isPaused = false
    document.getElementById("pauseButton").innerHTML = "Pause"
  } else {
    //Current state: Pause
    isPaused = true
    document.getElementById("pauseButton").innerHTML = "Resume"
  }
}

function resetCountdown() {
  isPaused = false
  clearInterval(interval);
  document.getElementById("countdown").innerHTML = "00:00";
  document.getElementById("pauseButton").innerHTML = "Pause"
}
