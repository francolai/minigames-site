import { useState, useRef, useEffect } from 'react';

import TicTacToeGameGrid from './TicTacToeGameGrid';
import TicTacToeGameHeader from './TicTacToeGameHeader';
import Modal from '../shared/Modal';
import TicTacToeModalContent from './TicTacToeModalContent';
import TicTacToeGameManager from '../../util/tic-tac-toe/tic-tac-toe';

import '/src/styles/tic-tac-toe/tictactoe.css';
import TicTacToeMeta from './TicTacToeMeta';
import HomeButton from '../shared/HomeButton';

function TicTacToe() {
  const { current: gameManager } = useRef(new TicTacToeGameManager());
  const [gameState, setGameState] = useState(gameManager.getGameState());
  const [showModal, setShowModal] = useState(false);
  const [AIactive, setAIActive] = useState(true);

  const { turn: currentPlayer, grid1D, winner, state } = gameState;
  const winnerLocation = gameManager.getWinnerLocation();

  useEffect(() => {
    if (state === 'playing') {
      return;
    }
    const timer = setTimeout(() => setShowModal(true), 3000);
    return () => clearTimeout(timer);
  }, [state]);

  function handleCellClick(cellIdx) {
    gameManager.playOnCell1D(cellIdx);
    setGameState(gameManager.getGameState());
  }
  function handleRestartClick() {
    gameManager.restart();
    setGameState(gameManager.getGameState());
    setShowModal(false);
  }
  function handleAIToggle() {
    setAIActive((prev) => !prev);
    gameManager.toggleAI();
    gameManager.restart();
    setGameState(gameManager.getGameState());
  }

  return (
    <>
      <TicTacToeMeta />
      <HomeButton />
      <Modal open={showModal} className="game__modal">
        <TicTacToeModalContent
          winner={winner}
          onRestartButtonClick={handleRestartClick}
        />
      </Modal>
      <div className="game__container">
        <div className="game__container_toggleAI">
          Toggle AI
          <span>
            <input
              type="checkbox"
              onChange={handleAIToggle}
              checked={AIactive}
            />
          </span>
        </div>
        <TicTacToeGameHeader className="game__header" />
        <TicTacToeGameGrid
          gameOver={state === 'finished'}
          currentPlayer={currentPlayer}
          selectedCells={grid1D}
          onCellClick={handleCellClick}
          winnerLocation={winnerLocation}
        />
        <button onClick={handleRestartClick}>Restart</button>
      </div>
    </>
  );
}

export default TicTacToe;
