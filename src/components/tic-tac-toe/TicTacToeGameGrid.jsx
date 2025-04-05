import '/src/styles/tic-tac-toe/tictactoegamegrid.css';

function TicTacToeGameGrid({
  gameOver,
  currentPlayer,
  selectedCells,
  onCellClick,
  winnerLocation,
}) {
  const winnerLoc = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (gameOver) {
    winnerLocation.forEach(({ row, col }) => (winnerLoc[row * 3 + col] = 1));
  }
  return (
    <div
      className={`game__grid ${
        gameOver ? 'game__grid-game_over' : `game__grid-turn_${currentPlayer}`
      }`}
    >
      {Array(9)
        .fill()
        .map((val, ind) => (
          <div
            key={`game__grid-cell_${ind}`}
            className={`game__grid-cell_${ind}`}
            onClick={() => onCellClick(ind)}
          >
            <div
              className={`game__grid-cell_${ind}_content ${
                selectedCells[ind] ? selectedCells[ind] : 'unselected'
              } ${winnerLoc[ind] ? 'winner' : ''}`}
            ></div>
          </div>
        ))}
    </div>
  );
}

export default TicTacToeGameGrid;
