function TicTacToeModalContent({ winner, onRestartButtonClick }) {
  return (
    <>
      <h1>GAME OVER!</h1>
      <h3>
        {winner && winner !== 'draw'
          ? `${winner.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())} wins!`
          : `A Draw!`}
      </h3>
      <div className="game__modal-button_container">
        <button className="game__modal-button" onClick={onRestartButtonClick}>
          Restart
        </button>
        <button className="game__modal-button">Close</button>
      </div>
    </>
  );
}

export default TicTacToeModalContent;
