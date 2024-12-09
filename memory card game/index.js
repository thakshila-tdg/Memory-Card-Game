// Create card data
const cardSymbols = ["🍎", "🍌", "🍇", "🍒", "🥝", "🍍", "🍉", "🍓"];
let cards = [...cardSymbols, ...cardSymbols];

// Shuffle cards
cards = cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
const totalScore = cardSymbols.length * 10; // Each pair is worth 10 points

// Initialize game board
function initializeBoard() {
    cards.forEach((symbol) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });

    // Set the total score
    totalDisplay.textContent = totalScore;
}

// Flip card
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains("matched")) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

// Check if two cards match
function checkMatch() {
    lockBoard = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        updateScore();
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            firstCard.textContent = "";
            secondCard.classList.remove("flipped");
            secondCard.textContent = "";
            resetTurn();
        }, 1000);
    }
}

// Update score
function updateScore() {
    score += 10; // Add 10 points for each match
    scoreDisplay.textContent = score;
}

// Reset turn
function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Initialize the game
initializeBoard();



