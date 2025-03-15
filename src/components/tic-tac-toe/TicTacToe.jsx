import { useState } from 'react';

import TicTacToeGameGrid from './TicTacToeGameGrid';
import TicTacToeGameHeader from './TicTacToeGameHeader';
import Modal from '../shared/Modal';
import TicTacToeModalContent from './TicTacToeModalContent';
import TicTacToeGameLogic from '../../util/tic-tac-toe/tic-tac-toe-gameLogic';

import '/src/styles/tic-tac-toe/tictactoe.css';

const gameLogic = new TicTacToeGameLogic();

function TicTacToe() {
  const [selectedCells, setSelectedCells] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(gameLogic.currentPlayer);

  function handleCellClick(cellID) {
    if (selectedCells[cellID] || gameLogic.isGameOver()) {
      return;
    }
    setSelectedCells((prevSelectedCells) => {
      return { ...prevSelectedCells, [cellID]: currentPlayer };
    });
    gameLogic.play(cellID);
    if (!gameLogic.isGameOver()) {
      setCurrentPlayer(gameLogic.currentPlayer);
    }
  }
  function handleRestartClick() {
    gameLogic.reset();
    setCurrentPlayer(gameLogic.currentPlayer);
    setSelectedCells({});
  }

  return (
    <>
      <Modal open={gameLogic.isGameOver()} className="game__modal">
        <TicTacToeModalContent
          winner={gameLogic.winner}
          onRestartButtonClick={handleRestartClick}
        />
      </Modal>
      <div className="game__container">
        <TicTacToeGameHeader className="game__header" />
        <TicTacToeGameGrid
          gameOver={gameLogic.isGameOver()}
          currentPlayer={currentPlayer}
          selectedCells={selectedCells}
          onCellClick={handleCellClick}
        />
        <button onClick={handleRestartClick}>Restart</button>
      </div>
    </>
  );
}

export default TicTacToe;
