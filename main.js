// HTML elements & DOM:
const wordElement = document.getElementById("word");
const lettersElement = document.getElementById("letters");
const guessesElement = document.getElementById("guesses");
const resultElement = document.getElementById("result");
const hangmanContainer = document.getElementById("hangman-container");
const clueElement = document.getElementById("clue");
const clueButton = document.getElementById("clueButton");
const hintButton = document.getElementById("hintButton");
const h1Element = document.querySelector("h1");
const h2Element = document.querySelector("h2");
const gameContainer = document.createElement("div");
const directionElement = document.querySelector(".directions");
const directionButton = document.getElementById("directionButton");
const startButton = document.createElement("button");

// Set text content for elements:
startButton.textContent = "Start Game";

// Assign ids to elements:
startButton.id = "startButton";

// Append elements to parent nodes:
h1Element.appendChild(startButton);
clueElement.appendChild(clueButton);
clueElement.appendChild(hintButton);


// Variables:
let word;
let guesses = [];
let correctGuesses = [];
let wrongGuesses = [];
let maxWrongGuesses = 6;
let gameFinished = false;
let currentStep = 0;

// Event listeners for my buttons:
startButton.addEventListener("click", () => {
  newGame();
  h1Element.style.display = "none"
  directionElement.style.display = "none";
  directionButton.style.display = "block"
  clueButton.style.display = "block";
  hintButton.style.display = "block";
});

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

//functions to run the game add my api that pulls a random word and the definition from another api, and resetting the game:
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
    if (data.length > 0 && data[0].meanings && data[0].meanings.length > 0 && data[0].meanings[0].definitions && data[0].meanings[0].definitions.length > 0) { // Check if the data has the expected structure for the word -> definition
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
  guesses = [];
  correctGuesses = [];
  wrongGuesses = [];
  currentStep = 0;
  gameFinished = false;
  let randomWord = "";
  //while loop to run until it finds a word that fits my conditions
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
    
      showLetter();
      showGuesses();
      if (currentStep === 6) {
        endGame();
      }
    });
  }
  showLetter();
}

function showLetter() {
  let displayedWord = "";
  for (let i = 0; i < wordArray.length; i++) {
    if (correctGuesses.includes(wordArray[i])) {
      displayedWord += wordArray[i] + "";
    } else {
      displayedWord += " _ ";
    }
  }
  wordElement.innerHTML = displayedWord.trim();
  
  if (correctGuesses.length === 0) {
    guessesElement.style.backgroundColor = "transparent";
    wordElement.style.backgroundColor = "transparent";
  } else {
    guessesElement.style.backgroundColor = "rgb(255 255 255 / 45%)";
    wordElement.style.backgroundColor = "rgb(255 255 255 / 45%)";
  }
}

function showGuesses() {
  guessesElement.innerHTML = "Incorrect guesses: " + wrongGuesses.join(", ");
  if (wrongGuesses.length === 5) {
    alert("You have one more attempt. Guess carefully!");
  }
  if (wrongGuesses.length > 0) {
    guessesElement.style.backgroundColor = "rgb(255 255 255 / 45%)"; 
  }
}

function resetGame() {
  window.location.reload();
}

function endGame() {
  gameFinished = true;
  const resultMessage =
    correctGuesses.length === wordArray.length
      ? "You won! Great Job"
      : "You lost. Sadly our surfer stick will now be drunk surfing and thats extremely dangerous! The word was " + word + ".";
  
  drawMan(currentStep);
  if (currentStep === 6) {
    setTimeout(() => {
      alert(resultMessage);
      resetGame();
      guessesElement.style.backgroundColor = "transparent";
      wordElement.style.backgroundColor = "transparent";
    }, 500); 
  } else {
    alert(resultMessage);
    resetGame();
    guessesElement.style.backgroundColor = "transparent";
    wordElement.style.backgroundColor = "transparent";
  }
}

const imagePaths = [ "./images/hangman1.png", "./images/hangman2.png", "./images/hangman3.png", "./images/hangman4.png", "./images/hangman5.png", "./images/hangman6.png" ];

const images = imagePaths.map((path) => {
  const img = new Image();
  img.src = path;
  return img;
});

function drawMan(currentStep) {
  if (currentStep <= 6) {
    const image = images[currentStep - 1];
    const currentImage = hangmanContainer.querySelector('img');
    if (currentImage) {
      hangmanContainer.removeChild(currentImage);
    }
    hangmanContainer.appendChild(image);
  }
}
