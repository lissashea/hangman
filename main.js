//variables
let word;
let wordArray;
let guesses = [];
let correctGuesses = [];
let wrongGuesses = [];
let maxWrongGuesses = 6;
let gameFinished = false;
let currentStep = 0;

//get my dom read to rock
const wordElement = document.getElementById("word");
const lettersElement = document.getElementById("letters");
const guessesElement = document.getElementById("guesses");
const resultElement = document.getElementById("result");
const hangmanElement = document.getElementById("hangman");

// when i have my letters ready when need them to click 
lettersElement.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON" && !gameFinished) {
    const letter = event.target.textContent;
    event.target.disabled = true;
    if (wordArray.includes(letter)) {
      correctGuesses.push(letter);
      showWord();
      if (correctGuesses.length === wordArray.length) {
        endGame(true);
      }
    } else {
      wrongGuesses.push(letter);
      currentStep++;
      showGuesses();
      if (wrongGuesses.length === maxWrongGuesses) {
        endGame(false);
      }
    }
  }
});

function newGame() {
  guesses = [];
  correctGuesses = [];
  wrongGuesses = [];
  currentStep = 0;
  gameFinished = false;

  word = prompt("Enter a word to guess:");
    if (!word) {
      return;
    }
    wordArray = word.toUpperCase().split("");

    showWord();

    lettersElement.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const button = document.createElement("button");
      button.textContent = letter;
      lettersElement.appendChild(button);
    }


  function showWord() {

  }

  function showGuesses() {

  }

  function endGame(win) {
    gameFinished = true;
  }
}

newGame();