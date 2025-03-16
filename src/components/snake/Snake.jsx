import { useEffect, useReducer, useState, useRef } from 'react';
import '/src/styles/snake/snake.css';
import snakeHeadReducer from './snakeHeadReducer';
import { NUM_ROW, NUM_COL, INIT_POS, MOVE_SPEED } from './snakeInitVar.js';
import HomeButton from '../shared/HomeButton.jsx';

function Snake() {
  const [snakeHead, moveSnakeHead] = useReducer(snakeHeadReducer, INIT_POS);
  const [snack, setSnack] = useState({ ...INIT_POS, col: 13 });
  const [direction, setDirection] = useState('RIGHT');
  const timer = useRef({ timeoutTime: Date.now(), timeoutID: null });

  /* Add key-down event listener */
  useEffect(() => {
    function handleKeyDown(event) {
      const keyPressed = event.key;
      console.log(keyPressed, direction);
      if (keyPressed === 'ArrowUp' && direction !== 'DOWN') {
        setDirection('UP');
        return;
      }
      if (keyPressed === 'ArrowDown' && direction !== 'UP') {
        setDirection('DOWN');
        return;
      }
      if (keyPressed === 'ArrowLeft' && direction !== 'RIGHT') {
        setDirection('LEFT');
        return;
      }
      if (keyPressed === 'ArrowRight' && direction !== 'LEFT') {
        setDirection('RIGHT');
        return;
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  /* make snake move automatically. */
  useEffect(() => {
    const remainingTime = timer.current.timeoutTime - Date.now();
    if (remainingTime > 0) {
      clearTimeout(timer.current.timeoutID);
      timer.current.timeoutID = setTimeout(
        () => moveSnakeHead(direction),
        remainingTime
      );
    } else {
      timer.current.timeoutTime = Date.now() + MOVE_SPEED;
      timer.current.timeoutID = setTimeout(
        () => moveSnakeHead(direction),
        MOVE_SPEED
      );
    }
  }, [snakeHead, direction]);

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
          {snakeHead.row === i && snakeHead.col === j && (
            <div className="snake_game_container__grid-cell-snake highlighted" />
          )}
          {snack.row === i && snack.col === j && (
            <div className="snake_game_container__grid-cell-snack" />
          )}
        </div>
      );
    }
  }
  return (
    <>
      <HomeButton />
      <div className="snake_game_container">
        <div className="snake_game_container__grid">{gridCells}</div>
      </div>
    </>
  );
}

export default Snake;
