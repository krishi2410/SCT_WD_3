const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let isCircleTurn = false;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'o' : 'x';
  cell.innerText = currentClass.toUpperCase();
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    statusText.textContent = `🎉 Player ${currentClass.toUpperCase()} Wins!`;
    endGame();
  } else if (isDraw()) {
    statusText.textContent = "🤝 It's a Draw!";
  } else {
    isCircleTurn = !isCircleTurn;
    statusText.textContent = `Player ${isCircleTurn ? 'O' : 'X'}'s turn`;
  }
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.innerText === 'X' || cell.innerText === 'O');
}

function checkWin(currentPlayer) {
  return WINNING_COMBINATIONS.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}