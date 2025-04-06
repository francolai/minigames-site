import { useEffect, useState, useRef } from 'react';

import { MOVE_SPEED } from '../../util/snake/snakeInitVar.js';
import SnakeGameManager from '../../util/snake/snake.js';
import HomeButton from '../shared/HomeButton.jsx';
import Modal from '../shared/Modal.jsx';
import SnakeDrawer from './SnakeDrawer.jsx';
import SnakeMeta from './SnakeMeta.jsx';
import SnakeGamePad from './SnakeGamePad.jsx';

import apple from '/src/assets/snake/apple.png';
import pauseLogo from '/src/assets/snake/pause.svg';
import playLogo from '/src/assets/snake/play.svg';
import restartLogo from '/src/assets/snake/restart.svg';

import '/src/styles/snake/snake-ui.css';

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
      if (gameManager.isGameOver()) {
        return setGameOver(true);
      }
      setPositions(gameManager.getPositions());
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
      <Modal open={gameOver}>
        <p>Game Over</p>
        <button onClick={handleRestartClick}>Restart</button>
      </Modal>
      <div className="snake_game_ui">
        <div className="snake_game_header_bar">
          <HomeButton />
          <span className="snake_game_header_bar__score">
            <img src={apple} /> {gameManager.getScore()}
          </span>
        </div>
        <SnakeDrawer snakePos={snakePos} snackPos={snackPos} />
        <div className="snake_game_buttons">
          <img src={playLogo} onClick={handleStartClick} />
          <img src={pauseLogo} onClick={handlePauseClick} />
          <img src={restartLogo} button onClick={handleRestartClick} />
        </div>
        <SnakeGamePad changeDirection={changeDirection} />
      </div>
    </>
  );
}

export default Snake;
