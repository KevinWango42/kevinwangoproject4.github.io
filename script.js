let startTime;
let timerInterval;
let gameStarted = false;
let currentLetterIndex = 0; // Added variable to track the current letter index.

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// startTimer() starts the timer, enables the input field, clears its value, sets the focus on it, and sets the game state to started. 
// It also calls the displayCurrentLetter() function to display the current letter.

function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 10);
  document.getElementById("input").disabled = false;
  document.getElementById("input").value = "";
  document.getElementById("input").focus();
  gameStarted = true;
  displayCurrentLetter(); // This added line displays the current letter.
}

// resetGame() function clears the timer interval, resets the game state to not started, and reloads the page to reset the game.

function resetGame() {
  clearInterval(timerInterval);
  gameStarted = false;
  location.reload(); // Reloads the page to reset the game.
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  document.getElementById("timer").innerHTML = `${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
}

// function is triggered when the input field value changes. It checks if the game has started and compares the user input with the expected current letter.


// It checks if the game has started and compares the user input with the expected current letter.
// It updates the input field value based on correctness and handles scenarios such as backspacing or incorrect input.

function checkInput() { 
    if (!gameStarted) {
      startTimer();
    }
  
    const userInput = document.getElementById("input").value.toUpperCase();
    const currentLetter = alphabet[currentLetterIndex].toUpperCase();
  
    if (userInput.slice(0, -1).toUpperCase() === alphabet.slice(0, currentLetterIndex)) {
      document.getElementById("input").value = userInput.slice(0, -1) + currentLetter;
    } else {
      document.getElementById("input").value = alphabet.slice(0, currentLetterIndex);
    }
  
    if (userInput.slice(-1).toUpperCase() === currentLetter) {
      currentLetterIndex++;
      displayCurrentLetter();                                           
    } else if (userInput.slice(-1).toUpperCase() !== currentLetter) {
      if (userInput.slice(-1).toUpperCase() === alphabet.slice(0, currentLetterIndex).slice(-1).toUpperCase()) {
        document.getElementById("input").value = userInput.slice(0, -1);
      } else {
        document.getElementById("input").value = alphabet.slice(0, currentLetterIndex);
      }
    }
  
    if (currentLetterIndex === alphabet.length) {
      clearInterval(timerInterval);
      document.getElementById("input").disabled = true;
      const time = document.getElementById("timer").innerHTML;
      document.getElementById("congratsTime").textContent = time;
      showCongratulations();
    }
  }
  
// function updates the HTML element displaying the current letter based on the current letter index.

function displayCurrentLetter() {
  document.getElementById("currentLetter").textContent = alphabet[currentLetterIndex];
}

function showCongratulations() {
  const congratulationsContainer = document.querySelector(".congratulations-container");
  congratulationsContainer.style.display = "flex";
  document.getElementById('Your time: ', "timerLabel").style.display = "none";
}

function hideCongratulations() {
  const congratulationsContainer = document.querySelector(".congratulations-container");
  congratulationsContainer.style.display = "none";
}

// Event listeners are added to the input field, reset button, and close button to trigger the corresponding functions when specific actions occur.

document.getElementById("input").addEventListener("input", checkInput);
document.getElementById("resetButton").addEventListener("click", resetGame);
document.getElementById("closeButton").addEventListener("click", hideCongratulations);