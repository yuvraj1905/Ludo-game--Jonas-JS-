'use strict';

//winner modal,its winning line(in winner) control imports
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const winner = document.querySelector('#winner');

//newGame button control import
const btnNewGame = document.querySelector('.btn--new');

//rolling rice button & dice control import
const rollBtn = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const hold = document.querySelector('.btn--hold');

//player and score control imports
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const p1Score = document.querySelector('#score--0');
const p2Score = document.querySelector('#score--1');
const p1Current = document.querySelector('#current--0');
const p2Current = document.querySelector('#current--1');

//initial values
let activePlayer = true; //1st player ke liye true assign kar rahe hai
let tempScore = 0;
let finalScore1 = 0;
let finalScore2 = 0;

function newGameConfigs() {
  activePlayer = true;
  tempScore = 0;
  p1Score.innerText = 0;
  p2Score.innerText = 0;
  rollBtn.style.display = 'block';
  hold.style.display = 'block';
  finalScore1 = 0;
  finalScore2 = 0;
  player2.classList.remove('player--winner', 'name');
  player2.classList.remove('player--active');
  p2Score.classList.remove('player--winner', 'name');

  player1.classList.add('player--active'); //because 1st chance 1st player ko dena h.
  player1.classList.remove('player--winner', 'name');
  p1Score.classList.remove('player--winner', 'name');
}
newGameConfigs();

rollBtn.addEventListener('click', () => {
  const diceValue = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceValue}.png`; //accordingly dice image render ho
  if (diceValue != 1) {
    tempScore += diceValue;
    if (activePlayer) {
      p1Current.innerText = tempScore;
    } else {
      p2Current.innerText = tempScore;
    }
  } else {
    if (activePlayer) {
      tempScore = 0;
      p1Current.innerText = tempScore;
      activePlayer = false;
      player1.classList.remove('player--active');
      player2.classList.add('player--active');
    } else {
      tempScore = 0;
      p2Current.innerText = tempScore;
      activePlayer = true;
      player2.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  }
});

function openModal(winnername) {
  winner.innerText = `${winnername.toUpperCase()} wins  🤩✨👍`;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
function gameDisableConfigs() {
  rollBtn.style.display = 'none';
  hold.style.display = 'none';
}
function player1WinConfigs() {
  player1.classList.add('player--winner', 'name', 'extraMarginRemover');
  p1Score.classList.add('player--winner', 'name');
  openModal('player1');
}
function player2WinConfigs() {
  player2.classList.add('player--winner', 'name', 'extraMarginRemover');
  p2Score.classList.add('player--winner', 'name');

  openModal('player2');
}

// function playerWinConfigs(num) {
//   `player${num}`.classList.add('player--winner', 'name');
//   `p${num}Score`.classList.add('player--winner', 'name');
//   openModal(`player${num}`);
// }

hold.addEventListener('click', () => {
  if (activePlayer) {
    finalScore1 += Number(p1Current.innerText);
    p1Score.innerText = finalScore1;

    tempScore = 0;
    p1Current.innerText = tempScore;
    if (finalScore1 >= 50) {
      gameDisableConfigs();
      player1WinConfigs();
    }
    activePlayer = false;
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  } else {
    finalScore2 += Number(p2Current.innerText);
    p2Score.innerText = finalScore2;
    tempScore = 0;
    p2Current.innerText = tempScore;
    if (finalScore2 >= 50) {
      gameDisableConfigs();
      player2WinConfigs();
    }
    activePlayer = true;
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
});

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

btnNewGame.addEventListener('click', newGameConfigs);
