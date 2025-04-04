import { NUM_COL, NUM_ROW } from '../../util/snake/snakeInitVar';
import '/src/styles/snake/snake-drawer.css';

function SnakeDrawer({ snakePos, snackPos }) {
  const gridCells = [];
  for (let i = 0; i < NUM_ROW; ++i) {
    for (let j = 0; j < NUM_COL; ++j) {
      gridCells.push(
        <div
          className="snake_game_container__grid-cell"
          row={i}
          col={j}
          key={`cell_${i}_${j}`}
        >
          {snackPos.row === i && snackPos.col === j && (
            <div className="snake_game_container__grid-cell-snack pulse" />
          )}
        </div>
      );
    }
  }

  snakePos.forEach(({ row, col }, idx) => {
    if (idx === 0) {
      gridCells[NUM_COL * row + col] = (
        <div
          className="snake_game_container__grid-cell"
          row={row}
          col={col}
          key={`cell_${row}_${col}`}
        >
          <div
            className="snake_game_container__grid-cell-snake highlighted"
            key={`snake-head`}
          />
        </div>
      );
    } else {
      gridCells[NUM_COL * row + col] = (
        <div
          className="snake_game_container__grid-cell"
          row={row}
          col={col}
          key={`cell_${row}_${col}`}
        >
          <div
            className="snake_game_container__grid-cell-snake"
            key={`snake-body-${idx}`}
          />
        </div>
      );
    }
  });
  return (
    <div className="snake_game_container">
      <div className="snake_game_container__grid">{gridCells}</div>
    </div>
  );
}

export default SnakeDrawer;
