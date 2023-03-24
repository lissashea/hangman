
//variables
let word;
let guesses = [];
let correctGuesses = [];
let wrongGuesses = [];
let maxWrongGuesses = 6;
let gameFinished = false;
let currentStep = 0;
let data = []

//get my dom read to rock
const wordElement = document.getElementById("word");
const lettersElement = document.getElementById("letters");
const guessesElement = document.getElementById("guesses");
const resultElement = document.getElementById("result");
const hangmanElement = document.getElementById("hangman");
const clueElement = document.getElementById("clue")

async function getRandomWord(){
  console.log("Fetching random word...");
  const response = await fetch(`https://random-word-api.herokuapp.com/word`);
  const data = await response.json();
  // console.log("Random word fetched:", data[0]);
  return data[0]; // return the actual word
}


function addData(object) {
  data.push(object)
}

async function newGame() {
  guesses = [];
  correctGuesses = [];
  wrongGuesses = [];
  currentStep = 0;
  gameFinished = false;
  const randomWord = await getRandomWord();
  word = randomWord;
  wordArray = word.split("");
  console.log(word)

    lettersElement.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const button = document.createElement("button");
      button.textContent = letter;
      lettersElement.appendChild(button);
      
      button.addEventListener('click', () => {
        if (gameFinished) {
          return;
        }
        guesses.push(button.innerHTML)
        button.classList.add('active');
        button.setAttribute('style', 'background-color: grey' )
        const selectedLetter = button.innerHTML.toLowerCase();
        if (wordArray.includes(selectedLetter)) {
          for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i] === selectedLetter) {
          correctGuesses.push(selectedLetter)
            }
          }
        } else {
        wrongGuesses.push(selectedLetter);
        currentStep++
        }

        showWord();
        showGuesses();
       if (currentStep === 6) {
        endGame();
       }
        console.log(currentStep)
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
      displayedWord += " _ "
    }
  }
  wordElement.innerHTML = displayedWord.trim();
}


function showGuesses() {
  guessesElement.innerHTML = "Incorrect guesses: " + wrongGuesses.join(", ");
}


function endGame() {
  gameFinished = true
}



