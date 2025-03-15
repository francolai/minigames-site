// Global constants and functions
const NOUGHT = 1;
const CROSS = -1;

function newGameGrid() {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

function checkWinConditions(grid) {
  return (
    (grid[0][0] && grid[0][0] === grid[0][1] && grid[0][0] === grid[0][2]) ||
    (grid[1][0] && grid[1][0] === grid[1][1] && grid[1][0] === grid[1][2]) ||
    (grid[2][0] && grid[2][0] === grid[2][1] && grid[2][0] === grid[2][2]) ||
    (grid[0][0] && grid[0][0] === grid[1][0] && grid[0][0] === grid[2][0]) ||
    (grid[0][1] && grid[0][1] === grid[1][1] && grid[0][1] === grid[2][1]) ||
    (grid[0][2] && grid[0][2] === grid[1][2] && grid[0][2] === grid[2][2]) ||
    (grid[0][0] && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) ||
    (grid[2][0] && grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2])
  );
}

function isFull(grid) {
  return (
    grid[0][0] &&
    grid[0][1] &&
    grid[0][2] &&
    grid[1][0] &&
    grid[1][1] &&
    grid[1][2] &&
    grid[2][0] &&
    grid[2][1] &&
    grid[2][2]
  );
}
/**
 * Represents a tic-tac-toe game instance.
 */
class TicTacToe {
  /**
   * Create and initialize a tic-tac-toe game.
   */
  constructor() {
    this._grid = newGameGrid();
    this._currentPlayer = NOUGHT;
    this._winner = null;
  }

  /** Get the current player.
   * @returns {string} the player - 'nought' or 'cross'.
   */
  get currentPlayer() {
    return this._currentPlayer === NOUGHT ? 'nought' : 'cross';
  }
  /** Get a 2-dimensional array representation of the game grid.
   * @returns {Array<Array<Number>>} the game grid in 2-d array. 1 represents noughts and -1 represents crosses.
   */
  get grid() {
    return this._grid;
  }
  /** Get the winner of the game.
   * @returns {string | null} 'nought' or 'cross', or null if no winner.
   */
  get winner() {
    if (!this._winner) {
      return null;
    }
    return this._winner === NOUGHT ? 'nought' : 'cross';
  }

  /**  Play on the cell with the corresponding cell ID.
   * If the game is over, log a message on the console instead.
   * @param {number} cellId - The id of the cell (1 ~ 9)
   */
  play(cellId) {
    if (this.isGameOver()) {
      return console.log(
        'Game Over. Cannot play anymore, please start a new game!'
      );
    }
    const rowInd = Math.floor((cellId - 1) / 3);
    const colInd = (cellId - 1) % 3;
    if (this.grid[rowInd][colInd]) {
      console.log('This cell is already played, please pick another cell.');
      return;
    }
    this.grid[rowInd][colInd] = this._currentPlayer;

    if (checkWinConditions(this.grid)) {
      this._winner = this._currentPlayer;
      return;
    }
    this._currentPlayer === NOUGHT
      ? (this._currentPlayer = CROSS)
      : (this._currentPlayer = NOUGHT);
  }

  /** Check if the game is over.
   * @returns {boolean} true if over, false otherwise.
   */
  isGameOver() {
    if (this._winner !== null || isFull(this.grid)) {
      return true;
    }
    return false;
  }

  /**
   * Reset and start a new game.
   */
  reset() {
    this._grid = newGameGrid();
    this._currentPlayer = NOUGHT;
    this._winner = null;
  }
}

export default TicTacToe;
