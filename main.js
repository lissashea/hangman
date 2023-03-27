let word;
let guesses = [];
let correctGuesses = [];
let wrongGuesses = [];
let maxWrongGuesses = 6;
let gameFinished = false;
let currentStep = 0;

const wordElement = document.getElementById("word");
const lettersElement = document.getElementById("letters");
const guessesElement = document.getElementById("guesses");
const resultElement = document.getElementById("result");
const hangmanContainer = document.getElementById("hangman-container");
const clueElement = document.getElementById("clue");
const clueButton = document.createElement("button");
const hintButton = document.createElement("button");
const startButton = document.createElement("button");
const directionButton = document.createElement("button")
const h1Element = document.querySelector("h1")
const directionElement = document.querySelector(".directions")
const h2Element = document.querySelector("h2")

clueButton.textContent = "Clue";
clueButton.id = "clueButton";
hintButton.textContent = "Hint";
hintButton.id = "hintButton";
clueElement.appendChild(clueButton);
clueElement.appendChild(hintButton);
startButton.textContent = "Start Game";
startButton.id = "startButton";
directionButton.id = "directionButton"
directionButton.textContent = "Directions"
h1Element.append(startButton);
h1Element.append(directionButton)

clueButton.style.display = "none";
hintButton.style.display = "none";
directionButton.style.display = "none";


startButton.addEventListener("click", () => {
  newGame();
  startButton.style.display = "none";
  directionButton.style.display = "block"
  clueButton.style.display = "block";
  hintButton.style.display = "block";
  directionElement.style.display = "none"
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

  if (res.ok) { // Check if response is successful
    const data = await res.json();
    if (data.length > 0 && data[0].meanings && data[0].meanings.length > 0 && data[0].meanings[0].definitions && data[0].meanings[0].definitions.length > 0) { // Check if the data has the expected structure
      const definition = data[0].meanings[0].definitions[0].definition;
      const partOfSpeech = data[0].meanings[0].partOfSpeech;

      return {
        definition: definition,
        partOfSpeech: partOfSpeech,
      };
    }
  }

  return null;
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
      break;
    }
  }

  console.log(word);

  wordArray = word.split("");

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
  // Show the clue and hint buttons
  clueButton.style.display = "block";
  hintButton.style.display = "block";
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

  directionButton.addEventListener("click", async () => {
    alert(`Guess the letters to uncover the word. You have 6 attempts to guess the word before the man is hanged.
    Click the "Clue" button for a hint about the word. Click the "Hint" button to see the part of speech of the word.`);
    directionButton.style.display = "block";
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

function resetGame() {
  // Reset all game variables
  word = null;
  guesses = [];
  correctGuesses = [];
  wrongGuesses = [];
  maxWrongGuesses = 6;
  currentStep = 0;
  gameFinished = false;
  wordDefinition = null;
  
  // Clear canvas
  hangmanContainer.innerHTML = "";

  
  // Reset HTML elements
  wordElement.innerHTML = "";
  guessesElement.innerHTML = "";
  resultElement.innerHTML = "";
  lettersElement.innerHTML = "";
  clueButton.style.display = "none";
  hintButton.style.display = "none";
  startButton.style.display = "block";
  directionButton.style.display = "none"
  directionElement.style.display = "flex"
}


function endGame() {
  gameFinished = true;
  const resultMessage =
    correctGuesses.length === wordArray.length
      ? "You won!"
      : "You lost. The word was " + word + ".";
  
  alert(resultMessage);
  resetGame();
  h1Element.style.display = "inherit"
  startButton.style.display = "block";
}

const imagePaths = [  "waves.png",  "surfboard1.png",  "image1.png",  "image2.png",  "image3.png",  "image4.png",  "image5.png",  "image6.png"];

function displayImage(currentStep) {
  const image = document.createElement('img');
  if (currentStep === 1) {
    image.src = imagePaths[0];
  } else if (currentStep === 2) {
    image.src = imagePaths[1];
  } else {
    image.src = imagePaths[currentStep];
  }
  hangmanContainer.appendChild(image);
}

function drawMan(currentStep) {
  displayImage(currentStep);
}

