"use strict";
import PopUp from './popup.js'
import Field from './field.js';
import * as sound from './sound.js'



const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
//status default value
let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=>{
  startGame();
})

const gamefield = new Field(CARROT_COUNT, BUG_COUNT);
gamefield.setClickListener((item)=> {
onItemClick()
});
function onItemClick(item) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (item == ("carrot")) {
    score++;
    updateScoreBoard();
  }
  if (score === CARROT_COUNT) {
    finishGame(true);
  } else if (item == ("bug")) {
    finishGame(false);
  }
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerandScore();
  startGameTimer();
  sound.playBackground();
}
function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText("REPLAY");
  sound.playAlert()
  sound.stopBackground()
}
function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
     sound.playWin()
  } else {
    sound.playBug();
  }
  gameFinishBanner.showWithText(win ? "WIN💯" : "LOSE🖕");
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = 'visible'
}
function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}
function showTimerandScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}
function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  upadteTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    upadteTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function upadteTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}


//bug, carrot create first then add at field
function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gamefield.init()
}




function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}



