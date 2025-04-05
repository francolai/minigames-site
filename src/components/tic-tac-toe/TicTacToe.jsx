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
