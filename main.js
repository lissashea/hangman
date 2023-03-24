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

    //add to word array to iterate through later on 
    wordArray = word.toUpperCase().split("");

    //Note that the Unicode value of "A" is 65, and the Unicode value of "Z" is 90.
    lettersElement.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      //from charcode The String.fromCharCode() static method returns a string created from the specified sequence of UTF-16 code units.
      const letter = String.fromCharCode(i);
      const button = document.createElement("button");
      button.textContent = letter;
      lettersElement.appendChild(button);
      button.addEventListener('click', () => {
        if (gameFinished) {
          return;
        }
        if (guesses.includes(button.innerHTML)) {
          return;
        }
        guesses.push(button.innerHTML);
        button.classList.add('active');
        if (wordArray.includes(button.innerHTML)) {
          for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i] === button.innerHTML) {
              correctGuesses.push(button.innerHTML)
            }
          }
        } else {
          wrongGuesses.push(button.innerHTML);
          currentStep++
        }
        showWord();
        showGuesses();
        endGame();
      })
    }
}
newGame()

function showWord() {
  let displayedWord = "";
  for (let i = 0; i < wordArray.length; i++) {
    if (correctGuesses.includes(wordArray[i])) {
      displayedWord += wordArray[i] + "";
    } else {
      displayedWord += "_"
    }
  }
  wordElement.innerHTML = displayedWord.trim();
}

function showGuesses() {
  guessesElement.innerHTML = ' incorrect guesses ' + wrongGuesses.join(", ");
}

function showGuesses() {
  guessesElement.innerHTML = "Incorrect guesses: " + wrongGuesses.join(", ");
}


// function endGame(win) {

gameFinished = true;
}

