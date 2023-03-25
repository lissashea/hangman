
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
const canvasElement = document.getElementById("canvas")
const resultText = document.getElementById("result-text");

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


// function drawMan(currentStep) {
//   if (currentStep == 6) {
//     resultElement.textContent.innerHTML = `<h2 class='lose-mesg>Game OVer!</h2><p>The word was<span>${word}</span></p>`;
//   }
// }

// displayOptions();

// const canvasCreater = () => {
//   let context = canvas.getContext("2d");
//   context.beginPath();
//   context.strokeStyle = "#000";
//   context.lineWidth = 2;

//   const drawLine = (fromX, fromY,toX,toY) => {
//     context.moveTo(fromX,fromY);
//     context.lineTo(toX, toY);

//   }

//   const head = () => {
//     context.beginPath();
//     context.arc(70,30,10,0,Math.PI * 2, true);
//     context.stroke();
//   }

//   const body = () => {
//     drawLine(70,40, 70, 80);
//   }

//   const leftArm = () => {
//     drawLine(70,50,50,70)
//   }

//   const rightArm = () => {
//     drawLine(70,50,90,70);
//   }

//   const leftLeg = () => {
//     drawLine(70,80,50,110);
//   }

//   const rightLeg = () => {
//     drawLine(70,80,90,110);
//   }

//   const InitialDrawing = () => {
//     context.clearRect(0,0,context.canvas.width, context.canvas.height);
//     drawLine(10,130,130,130);
//     drawLine(10,10,10,131);
//     drawLine(10,10,70,10);
//     drawLine(70,10,70,20);
//   };

//   return {InitialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg};

// }

// const drawMan = (currentStep ) => {
//   let { head, body, lefArm, rightArm, leftLeg, rightLeg } = canvasCreator() 
//   switch(currentStep) {
//     case 1: 
//       head();
//       break;
//     case 2:
//       body();
//       break;
//     case 3: 
//       leftArm();
//       break;
//     case 4:
//       rightArm();
//       break;
//     case 5: 
//       rightLeg();
//       break;
//     case 6: 
//       leftLeg();
//       break;
//     default:
//       break;
//   } 
// }
