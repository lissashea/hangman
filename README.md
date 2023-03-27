# Hangman Game

This is a Hangman game built using HTML, CSS, and JavaScript. The game randomly selects a word, and the player must guess the letters to uncover the word. The player has 6 attempts to guess the word before the game ends. The player can click the "Clue" button for a hint about the word or the "Hint" button to see the part of speech of the word.

# HTML Elements
- wordElement - The element that displays the word to be guessed
- lettersElement - The element that displays the available letters to be guessed
- guessesElement - The element that displays the incorrect letters guessed
- resultElement - The element that displays the result of the game
- hangmanContainer - The container for the hangman images
- clueElement - The element that displays the "Clue" and "Hint" buttons
- clueButton - The "Clue" button
- hintButton - The "Hint" button
- h1Element - The level 1 heading
- h2Element - The level 2 heading
- gameContainer - The container for the game
- directionElement - The element that displays the game instructions
- directionButton - The button that shows the game instructions
- startButton - The button that starts a new game

## Variables
- word - The word to be guessed
- guesses - The array of letters guessed
- correctGuesses - The array of correct letters guessed
- wrongGuesses - The array of incorrect letters guessed
- maxWrongGuesses - The maximum number of incorrect guesses allowed
- gameFinished - A boolean variable that indicates whether the game has ended
- currentStep - The current step in the hangman game

## Event Listeners
- startButton - Starts a new game
- clueButton - Shows a clue about the word
- hintButton - Shows the part of speech of the word
- directionButton - Shows the game instructions

## Functions
- getRandomWord() - Fetches a random word
- addData(object) - Adds a new object to the data array
- getDefinition(randomWord) - Fetches the definition and part of - speech of a word
- newGame() - Starts a new game
- showWord() - Displays the word to be guessed
- showGuesses() - Displays the incorrect letters guessed
- resetGame() - Resets the game
- endGame() - Ends the game
- drawMan(currentStep) - Draws the hangman image
- Images
- imagePaths - The paths to the hangman images
- images - The hangman images

## Note
This code is a work in progress and may be improved in the future.