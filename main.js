const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = [...letters];
// Get Array From Letters
let lettersContainer = document.querySelector(".letters");
// Select Letters Container
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let spanText = document.createTextNode(letter);
  span.appendChild(spanText);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "Assembly",
    "Fortran",
    "COBOL",
    "LISP",
    "BASIC",
    "C",
    "Java",
    "Python",
    "JavaScript",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Go",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
    "Dune",
    "Spider-Man",
    "Oppenheimer ",
    "Barbie",
    "Dune",
    "Gladiator II",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
    "Leonardo da Vinci",
    "Marie Curie",
    "Nelson Mandela",
    "Steve Jobs",
    "Elon Musk",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qatar",
    "Japan",
    "Brazil",
    "South Korea",
    "Canada",
    "Australia",
    "Germany",
    "India",
  ],
};
let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach((letter) => {
  let span = document.createElement("span");
  if (letter === " ") {
    span.className = "with-space";
  }
  lettersGuessContainer.appendChild(span);
});
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Function to check if the player won
function checkWin() {
  let filledSpans = 0;
  guessSpans.forEach((span) => {
    if (span.innerHTML !== "" && !span.classList.contains("with-space")) {
      filledSpans++;
    }
  });
  return (
    filledSpans === lettersAndSpace.filter((letter) => letter !== " ").length
  );
}

// Function to reset the game
function resetGame() {
  document.querySelector(".popup")?.remove();
  wrongAttempts = 0;
  theDraw.className = "hangman-draw";
  lettersContainer.classList.remove("finished");
  lettersContainer
    .querySelectorAll(".letter-box")
    .forEach((span) => span.classList.remove("clicked"));
  lettersGuessContainer.innerHTML = "";
  randomPropNumber = Math.floor(Math.random() * allKeys.length);
  randomPropName = allKeys[randomPropNumber];
  randomPropValue = words[randomPropName];
  randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
  randomValueValue = randomPropValue[randomValueNumber];
  document.querySelector(".game-info .category span").innerHTML =
    randomPropName;
  lettersAndSpace = Array.from(randomValueValue);
  lettersAndSpace.forEach((letter) => {
    let span = document.createElement("span");
    if (letter === " ") {
      span.className = "with-space";
    }
    lettersGuessContainer.appendChild(span);
  });
  guessSpans = document.querySelectorAll(".letters-guess span");
}

document.addEventListener("click", (e) => {
  if (
    e.target.className === "letter-box" &&
    !e.target.classList.contains("clicked")
  ) {
    e.target.classList.add("clicked");
    let theStatus = false;
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter === wordLetter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    if (!theStatus) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      if (wrongAttempts === 8) {
        endGame(false); // Loss
        lettersContainer.classList.add("finished");
      }
    } else if (checkWin()) {
      endGame(true); // Win
      lettersContainer.classList.add("finished");
    }
  }
});

function endGame(won = false) {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    won
      ? `Congratulations! You Won, The Word Is ${randomValueValue}`
      : `Game Over, The Word Is ${randomValueValue}`
  );
  div.appendChild(divText);

  let resetButton = document.createElement("button");
  let buttonText = document.createTextNode("Play Again");
  resetButton.appendChild(buttonText);
  resetButton.className = "reset-btn";
  resetButton.addEventListener("click", resetGame);
  div.appendChild(resetButton);

  div.className = `popup ${won ? "win" : "lose"}`;
  document.body.appendChild(div);
}
