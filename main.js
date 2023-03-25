//variables
let word;
let guesses = [];
let correctGuesses = [];
let wrongGuesses = [];
let maxWrongGuesses = 6;
let gameFinished = false;
let currentStep = 0;
let data = []
let wordDefinition;

//get my dom read to rock
const wordElement = document.getElementById("word");
const lettersElement = document.getElementById("letters");
const guessesElement = document.getElementById("guesses");
const resultElement = document.getElementById("result");
const hangmanElement = document.getElementById("hangman");
const clueElement = document.getElementById("clue")
const canvasElement = document.getElementById("canvas")
const resultText = document.getElementById("result-text");
const clueButton = document.createElement("button");
const hintButton = document.createElement("button");
const startButton = document.createElement("button");
const gameContainer = document.getElementsByClassName("game-container")
h1Element = document.querySelector("h1")

clueButton.textContent = "Clue";
clueButton.id = "clueButton";
hintButton.textContent = "Hint";
hintButton.id = "hintButton";
clueElement.appendChild(clueButton);
clueElement.appendChild(hintButton);
startButton.textContent = "Start Game";
startButton.id = "startButton";
h1Element.append(startButton);

clueButton.style.display = "none";
hintButton.style.display = "none";

startButton.addEventListener("click", () => {
  newGame();
  clueButton.style.display = "block";
  hintButton.style.display = "block";
  startButton.style.display = "none";
});

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


async function getDefinition(randomWord) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
  );
  const dictionaryPull = await res.json();

  if (dictionaryPull.length === 0) {
    return null; // if the word is not found, return null
  }

  const definition = dictionaryPull[0].meanings[0].definitions[0].definition;
  const partOfSpeech = dictionaryPull[0].meanings[0].partOfSpeech;

  return {
    definition: definition,
    partOfSpeech: partOfSpeech,
  };
}


async function newGame() {
  resetGame();
  guesses = [];
  correctGuesses = [];
  wrongGuesses = [];
  currentStep = 0;
  gameFinished = false;
  let randomWord = "";
  while (true) {
    randomWord = await getRandomWord();
    console.log(randomWord);
    const definition = await getDefinition(randomWord);
    if (definition) {
      word = randomWord;
      wordDefinition = definition;
      break;
    }
  }
  console.log(word, wordDefinition);

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
      button.setAttribute('style', 'background-color: grey');
      const selectedLetter = button.innerHTML.toLowerCase();
      if (wordArray.includes(selectedLetter)) {
        for (let i = 0; i < wordArray.length; i++) {
          if (wordArray[i] === selectedLetter) {
            correctGuesses.push(selectedLetter);
          }
        }
      } else {
        wrongGuesses.push(selectedLetter);
        currentStep++;
        drawMan(currentStep);
      }
    
      showWord();
      showGuesses();
      if (currentStep === 6) {
        endGame();
      }
    });
  }
}


clueButton.addEventListener("click", async () => {
  const wordDefinition = await getDefinition(word);
  alert(`Clue: ${wordDefinition.definition}`);
  clueButton.style.display = "none";
  });
  
  hintButton.addEventListener("click", async () => {
  const wordDefinition = await getDefinition(word);
  alert(`Hint: ${wordDefinition.partOfSpeech}`);
  hintButton.style.display = "none";
  });

function showWord() {
let displayedWord = "";
for (let i = 0; i < wordArray.length; i++) {
if (correctGuesses.includes(wordArray[i])) {
displayedWord += wordArray[i] + "";
} else {
displayedWord += " _ ";
}
}
wordElement.innerHTML = displayedWord.trim();
}

function showGuesses() {
guessesElement.innerHTML = "Incorrect guesses: " + wrongGuesses.join(", ");
}

function endGame() {
gameFinished = true;
const resultMessage =
correctGuesses.length === wordArray.length
? "You won!"
: "You lost. The word was " + word + ".";
resultElement.innerHTML = resultMessage;
}

function resetGame() {
guesses = [];
correctGuesses = [];
wrongGuesses = [];
currentStep = 0;
gameFinished = false;
word = null;
wordArray = null;
wordDefinition = null;
resultElement.innerHTML = "";
canvasElement.getContext("2d").clearRect(0, 0, canvasElement.width, canvasElement.height);
lettersElement.innerHTML = "";
clueButton.style.display = "none";
hintButton.style.display = "none";
startButton.style.display = "block";
wordElement.innerHTML = "";
guessesElement.innerHTML = "";
}


function drawMan(currentStep) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  
  if (currentStep >= 1) {
  // Draw the head
  ctx.beginPath();
  ctx.arc(50, 25, 15, 0, 2 * Math.PI);
  ctx.stroke();
  }
  
  if (currentStep >= 2) {
  // Draw the body
  ctx.beginPath();
  ctx.moveTo(50, 40);
  ctx.lineTo(50, 90);
  ctx.stroke();
  }
  
  if (currentStep >= 3) {
  // Draw the left arm
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(30, 70);
  ctx.stroke();
  }
  
  if (currentStep >= 4) {
  // Draw the right arm
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(70, 70);
  ctx.stroke();
  }
  
  if (currentStep >= 5) {
  // Draw the left leg
  ctx.beginPath();
  ctx.moveTo(50, 90);
  ctx.lineTo(30, 110);
  ctx.stroke();
  }
  
  if (currentStep >= 6) {
    // Draw the right leg
    ctx.beginPath();
    ctx.moveTo(50, 90);
    ctx.lineTo(70, 110);
    ctx.stroke();
  
    // // Draw the right foot
    // ctx.beginPath();
    // ctx.arc(70, 110, 5, 0, 2 * Math.PI);
    // ctx.stroke();
  }
}  