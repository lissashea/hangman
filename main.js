// Initialize variables
let word;
let wordArray;
let guesses = [];
let correctGuesses = [];
let wrongGuesses = [];
let maxWrongGuesses = 6;
let gameFinished = false;
let currentStep = 0;

// DOM elements
const wordElement = document.getElementById("word");
const lettersElement = document.getElementById("letters");
const guessesElement = document.getElementById("guesses");
const resultElement = document.getElementById("result");
const hangmanElement = document.getElementById("hangman");

// Event listener for letter buttons
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

  
}