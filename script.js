'use strict';
// selecting element
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceImg = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
let currentPlayer1 = document.getElementById('current--0');
let currentPlayer2 = document.getElementById('current--1');
let playing = true;
let currentPlayer = 1;
const scorOfPlayer = [0, 0];
// functions
const initialGame = function () {
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceImg.classList.add('hidden');

  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;

  player1.classList.add('player--active');
  player2.classList.remove('player--active');

  player1.classList.contains('player--winner')
    ? player1.classList.remove('player--winner')
    : player2.classList.remove('player--winner');
};

const getRandom = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

const showCurrnt = function (curplyr, rndmNum) {
  curplyr === 1
    ? (currentPlayer1.textContent = +currentPlayer1.textContent + rndmNum)
    : (currentPlayer2.textContent = +currentPlayer2.textContent + rndmNum);
};

const changeNumOfCurrntPlyr = function () {
  return currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);
};

const changeThem = function () {
  player2.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const changeCurrentPlayer = function () {
  currentPlayer === 1
    ? (currentPlayer1.textContent = 0)
    : (currentPlayer2.textContent = 0);
  currentPlayer = changeNumOfCurrntPlyr();
  changeThem();
};

const showRoll = function () {
  if (playing) {
    diceImg.classList.remove('hidden');
    let randomNum = getRandom();
    diceImg.src = `dice-${randomNum}.png`;
    diceImg.classList.remove('hidden');
    if (randomNum !== 1) {
      showCurrnt(currentPlayer, randomNum);
    } else {
      changeCurrentPlayer();
    }
  }
};

const setScore = function () {
  if (playing) {
    if (currentPlayer === 1) {
      scorOfPlayer[currentPlayer - 1] += +currentPlayer1.textContent;
      score0El.textContent = scorOfPlayer[currentPlayer - 1];
      currentPlayer1.textContent = 0;
      changeCurrentPlayer();
    } else {
      scorOfPlayer[currentPlayer - 1] += +currentPlayer2.textContent;
      score1El.textContent = scorOfPlayer[currentPlayer - 1];
      currentPlayer2.textContent = 0;
      changeCurrentPlayer();
    }
  }

  howWin();
};
const howWin = function () {
  if (scorOfPlayer[0] >= 10) {
    playing = false;
    player1.classList.add('player--winner');
    player2.classList.remove('player--active');
    diceImg.classList.add('hidden');
  } else if (scorOfPlayer[1] >= 10) {
    playing = false;
    player2.classList.add('player--winner');
    player1.classList.remove('player--active');
    diceImg.classList.add('hidden');
  }
};

// inital
initialGame();

// start the game
btnRoll.addEventListener('click', showRoll);
btnNew.addEventListener('click', initialGame);
btnHold.addEventListener('click', setScore);
