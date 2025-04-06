import { NUM_COL, NUM_ROW } from '../../util/snake/snakeInitVar';
import {
  deduceHeadImg,
  deduceTailImg,
  deduceBodyImg,
} from '../../util/snake/snake-img-helper';
import '/src/styles/snake/snake-drawer.css';

import apple from '/src/assets/snake/apple.png';

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
            <img
              src={apple}
              className="snake_game_container__grid-cell-snack"
            ></img>
          )}
        </div>
      );
    }
  }

  snakePos.forEach(({ row, col }, idx, arr) => {
    if (idx === 0) {
      const headImg = deduceHeadImg({ row, col }, arr[1]);

      gridCells[NUM_COL * row + col] = (
        <div
          className="snake_game_container__grid-cell"
          key={`cell_${row}_${col}`}
        >
          <img
            className="snake_game_container__grid-cell-snake"
            key={`snake-head`}
            src={headImg}
          />
        </div>
      );
    } else if (idx === arr.length - 1) {
      const tailImg = deduceTailImg({ row, col }, arr[idx - 1]);

      gridCells[NUM_COL * row + col] = (
        <div
          className="snake_game_container__grid-cell"
          key={`cell_${row}_${col}`}
        >
          <img
            className="snake_game_container__grid-cell-snake"
            key={`snake-tail`}
            src={tailImg}
          />
        </div>
      );
    } else {
      const bodyImg = deduceBodyImg({ row, col }, arr[idx - 1], arr[idx + 1]);
      gridCells[NUM_COL * row + col] = (
        <div
          className="snake_game_container__grid-cell"
          key={`cell_${row}_${col}`}
        >
          <img
            className="snake_game_container__grid-cell-snake"
            key={`snake-body-${idx}`}
            src={bodyImg}
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
