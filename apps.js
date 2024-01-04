// Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
// Create a Tic-Tac-Toe game grid using your HTML element of choice.
// When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
// A heading should say whether it is X's or O's turn and change with each move made.
// A button should be available to clear the grid and restart the game.
// When a player has won, or the board is full and the
// game results in a draw, a Bootstrap alert or similar
// Bootstrap component should appear across the screen announcing the winner.
// **************************************************
// declaring variables I will need

// queryselectorALL is used to sselect all the cells in the grid
const cells = document.querySelectorAll(".cell");
// below i am targeting the h1 tag
const gameStatusText = document.querySelector("#gameStatus");
// /targeting the restart button
const restartBtn = document.querySelector("#restartBtn");
// win conditions stored in an  2 demensional array, this identifies what cells to check
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// using an array 9 of them one for each cell
let options = ["", "", "", "", "", "", "", "", ""];
// keeping track of player
let currentPlayer = "X";
// boolean variable to let the game run
let running = false;
initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", clickedCell));
  // this is saying if restart button is clicked invoke restartGame function(restarts the game)
  restartBtn.addEventListener("click", restartGame);
  gameStatusText.textContent = `${currentPlayer}'s turn`;
  // this below starts the game by setting boolean value to true
  running = true;
}

function clickedCell() {
  // we are targeting the individual cells
  const identifyCell = this.getAttribute("cellIndex");
  //  if the cell is not blank or or the game is not running dont respond
  if (options[identifyCell] != "" || !running) {
    return;
  }
  // if it's empty then update the cell with x or o
  updateCell(this, identifyCell);
  // invoking check winner function to logg x or o marks
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
// changes player alternates between clicks and displays who's turn it is
function playerTurnOver() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  // displays who's turn it is
  gameStatusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  let roundWon = false;
  // this for loop loops thru the conditions as the game plays out
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    // says if cells are blank continue playing
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    // if all three cells have same symbol
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  // if all three cells are the same x;s or o's alert appears declaring the winner
  if (roundWon) {
    alert(`${currentPlayer} wins!`);
    gameStatusText.textContent = `${currentPlayer} Wins!`;
    running = false;
    // or if it is a draw alert appears to call the draw and stop the game
  } else if (!options.includes("")) {
    alert(`DRAW!`);
    gameStatusText.textContent = `Draw!`;
    running = false;
    // or keep playing if none above or true
  } else {
    playerTurnOver();
  }
}
//
function restartGame() {
  // resetting first player to X
  currentPlayer = "X";
  // deleting all the x and o off the board
  options = ["", "", "", "", "", "", "", "", ""];
  // displays its x players turn
  gameStatusText.textContent = `${currentPlayer}'s turn`;
  // forEach method goes thru and clears the board
  cells.forEach((cell) => (cell.textContent = ""));
  // clears the text thats hows whos turn it is
  gameStatusText.textContent = "";
  // changes default running from false to true to restart the game
  running = true;
}
