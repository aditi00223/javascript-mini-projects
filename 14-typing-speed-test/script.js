// A pool of sentences - one will be picked randomly
const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "Practice makes a person perfect in every field",
  "JavaScript is a versatile language used everywhere",
  "Typing speed improves with regular daily practice",
  "Consistency and patience are the keys to success"
];

let currentSentence = "";
let timeLeft = 60;
let timerInterval = null;
let testStarted = false;

const quoteBox = document.getElementById("quoteBox");
const typingArea = document.getElementById("typingArea");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

// Load a random sentence and display it letter by letter (wrapped in spans)
function loadSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  quoteBox.innerHTML = "";

  currentSentence.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    quoteBox.appendChild(span);
  });
}

// Runs every time the user types something
function handleTyping() {
  const typedText = typingArea.value;
  const quoteSpans = quoteBox.querySelectorAll("span");

  // Start the timer on the very first keystroke
  if (!testStarted) {
    startTimer();
    testStarted = true;
  }

  let correctCount = 0;

  quoteSpans.forEach((span, index) => {
    const typedChar = typedText[index];

    if (typedChar == null) {
      span.classList.remove("correct", "incorrect");
    } else if (typedChar === span.textContent) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correctCount++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    }
  });

  // Live accuracy calculation
  const accuracy = typedText.length > 0
    ? Math.round((correctCount / typedText.length) * 100)
    : 100;
  accuracyDisplay.textContent = accuracy;

  // If user finished typing the whole sentence correctly, end early
  if (typedText === currentSentence) {
    endTest();
  }
}

// Countdown timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
}

// Calculate WPM and stop everything
function endTest() {
  clearInterval(timerInterval);
  typingArea.disabled = true;

  const wordsTyped = typingArea.value.trim().split(/\s+/).length;
  const timeTakenMinutes = (60 - timeLeft) / 60 || 1 / 60; // avoid divide by zero
  const wpm = Math.round(wordsTyped / timeTakenMinutes);

  wpmDisplay.textContent = wpm;
}

// Restart the whole test
function restartTest() {
  clearInterval(timerInterval);
  timeLeft = 60;
  testStarted = false;

  timerDisplay.textContent = timeLeft;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 100;

  typingArea.value = "";
  typingArea.disabled = false;
  typingArea.focus();

  loadSentence();
}

// Event listener - fires every time user types in the textarea
typingArea.addEventListener("input", handleTyping);

// Initialize on page load
window.onload = function() {
  loadSentence();
  typingArea.disabled = false;
};