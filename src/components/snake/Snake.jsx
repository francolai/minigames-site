import { useEffect, useState, useRef } from 'react';

import { MOVE_SPEED } from '../../util/snake/snakeInitVar.js';
import SnakeGameManager from '../../util/snake/snake.js';
import HomeButton from '../shared/HomeButton.jsx';
import Modal from '../shared/Modal.jsx';
import SnakeDrawer from './SnakeDrawer.jsx';
import SnakeMeta from './SnakeMeta.jsx';
import SnakeGamePad from './SnakeGamePad.jsx';

function Snake() {
  const { current: gameManager } = useRef(new SnakeGameManager());
  const [positions, setPositions] = useState(gameManager.getPositions());
  const [gameOver, setGameOver] = useState(false);
  const [pause, setPause] = useState(true);
  const requestID = useRef();
  const prevMoveTime = useRef();

  /* Add key-down event listener */
  useEffect(() => {
    function handleKeyDown(event) {
      if (pause || gameOver) {
        return;
      }
      const keyPressed = event.key;
      if (keyPressed === 'ArrowUp') {
        gameManager.changeSnakeDirection('UP');
        return;
      }
      if (keyPressed === 'ArrowDown') {
        gameManager.changeSnakeDirection('DOWN');
        return;
      }
      if (keyPressed === 'ArrowLeft') {
        gameManager.changeSnakeDirection('LEFT');
        return;
      }
      if (keyPressed === 'ArrowRight') {
        gameManager.changeSnakeDirection('RIGHT');
        return;
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pause, gameOver]);

  /* make snake move automatically. */
  function moveSnake(timestamp) {
    if (!prevMoveTime.current) {
      prevMoveTime.current = timestamp;
    }
    const timeElapsed = timestamp - prevMoveTime.current;
    if (timeElapsed >= MOVE_SPEED) {
      gameManager.moveSnake();
      setPositions(gameManager.getPositions());
      if (gameManager.isGameOver()) {
        return setGameOver(true);
      }
      prevMoveTime.current = timestamp;
    }
    requestID.current = requestAnimationFrame(moveSnake);
  }

  useEffect(() => {
    if (!gameOver && !pause) {
      requestID.current = requestAnimationFrame(moveSnake);
    }

    return () => cancelAnimationFrame(requestID.current);
  }, [gameOver, pause]);

  function handleRestartClick() {
    gameManager.restart();
    setGameOver(false);
    setPause(true);
    setPositions(gameManager.getPositions());
  }
  function handleStartClick() {
    setPause(false);
  }
  function handlePauseClick() {
    setPause(true);
  }
  function changeDirection(direction) {
    if (pause || gameOver) return;
    gameManager.changeSnakeDirection(direction);
  }

  const { snakePos, snackPos } = positions;
  return (
    <>
      <SnakeMeta />
      <HomeButton />
      <Modal open={gameOver}>
        Game Over
        <button onClick={handleRestartClick}>Restart</button>
      </Modal>
      Score: {gameManager.getScore()}
      <SnakeDrawer snakePos={snakePos} snackPos={snackPos} />
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handlePauseClick}>Pause</button>
      <button onClick={handleRestartClick}>Restart</button>
      <SnakeGamePad changeDirection={changeDirection} />
    </>
  );
}

export default Snake;
