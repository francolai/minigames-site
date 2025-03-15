import '/src/styles/tic-tac-toe/tictactoegamegrid.css';

function TicTacToeGameGrid({
  gameOver,
  currentPlayer,
  selectedCells,
  onCellClick,
}) {
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
            key={`game__grid-cell_${ind + 1}`}
            className={`game__grid-cell_${ind + 1} ${
              selectedCells[ind + 1] ? selectedCells[ind + 1] : 'unselected'
            }`}
            onClick={() => onCellClick(ind + 1)}
          />
        ))}
    </div>
  );
}

export default TicTacToeGameGrid;
