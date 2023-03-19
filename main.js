// Initialize variables
let word;
let wordArray;
let guesses = [];
let correctGuesses = [];
let wrongGuesses = [];
let maxWrongGuesses = 6;
let gameFinished = false;

// DOM elements
const wordElement = document.getElementById("word");
const lettersElement = document.getElementById("letters");
const guessesElement = document.getElementById("guesses");
const resultElement = document.getElementById("result");

