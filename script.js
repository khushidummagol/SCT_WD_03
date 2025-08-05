const cells = document.querySelectorAll(".cell");
const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer); // Add class "X" or "O" for styling
    checkWin();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}


function checkWin() {
  for (let combo of winningCombinations) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      gameOver = true;
      highlightWin(combo);
      popup.classList.remove("hidden");
      winnerText.textContent = `${board[a]} Wins!`;
      return;
    }
  }

  if (!board.includes("")) {
    gameOver = true;
    popup.classList.remove("hidden");
    winnerText.textContent = "It's a Draw!";
  }
}

function highlightWin(combo) {
  combo.forEach(index => {
    cells[index].style.textDecoration = "line-through";
    cells[index].style.color = "#ffe600";
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O"); // Remove previous styles
    cell.style.textDecoration = "none";
  });
  currentPlayer = "X";
  gameOver = false;
  popup.classList.add("hidden");
}
