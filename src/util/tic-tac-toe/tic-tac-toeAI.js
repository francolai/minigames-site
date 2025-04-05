import TicTacToeGameManager from './tic-tac-toe';
import { TicTacToeGrid } from './tic-tac-toe';
import { NOUGHT, CROSS, NONE } from './tic-tac-toe-global';

class TicTacToeAILogic {
  #grid;

  /**
   * Create an instance of tic-tac-toe AI logic.
   * @param {TicTacToeGrid} grid The reference to the grid.
   */
  constructor(grid) {
    this.#grid = grid;
  }

  /**
   * Finds and returns the indices of empty cells in the grid.
   * @returns {Set.<number>}
   */
  #findEmptyCells() {
    const emptyCells = new Set();
    this.#grid
      .get1DGrid()
      .forEach((cell, idx) =>
        cell === NONE ? emptyCells.add(idx) : undefined
      );
    return emptyCells;
  }

  /**
   * Finds the winning move for symbol, returns the index of the winning move, -1 if not found.
   * @param {string} symbol 'nought' or 'cross'
   * @returns {number | -1} The index of the winning move
   */
  #findWinningMove(symbol) {
    const sum = symbol === 'nought' ? 2 : -2;
    const grid = this.#grid.get1DGrid();
    const emptyCells = this.#findEmptyCells();
    // check rows
    for (let row = 0; row < 3; ++row) {
      if (grid[row * 3] + grid[row * 3 + 1] + grid[row * 3 + 2] === sum) {
        if (emptyCells.has(row * 3)) return row * 3;
        if (emptyCells.has(row * 3 + 1)) return row * 3 + 1;
        if (emptyCells.has(row * 3 + 2)) return row * 3 + 2;
      }
    }

    // check columns
    for (let col = 0; col < 3; ++col) {
      if (grid[col] + grid[col + 3] + grid[col + 6] === sum) {
        if (emptyCells.has(col)) return col;
        if (emptyCells.has(col + 3)) return col + 3;
        if (emptyCells.has(col + 6)) return col + 6;
      }
    }

    // check diagonals
    if (grid[0] + grid[4] + grid[8] === sum) {
      if (emptyCells.has(0)) return 0;
      if (emptyCells.has(4)) return 4;
      if (emptyCells.has(8)) return 8;
    }
    if (grid[2] + grid[4] + grid[6] === sum) {
      if (emptyCells.has(2)) return 2;
      if (emptyCells.has(4)) return 4;
      if (emptyCells.has(6)) return 6;
    }

    return -1;
  }

  /**
   * Returns the next move for symbol. The order of priority is as follows:
   * 1. A winning move.
   * 2. A defending move.
   * 3. A random move.
   * @param {'nought' | 'cross'} symbol
   * @returns {number} The 1D index of the move.
   */
  findNextMove(symbol) {
    const myWinningMove = this.#findWinningMove(symbol);
    if (myWinningMove !== -1) {
      return myWinningMove;
    }
    const opponent = symbol === 'nought' ? 'cross' : 'nought';
    const opponentWinningMove = this.#findWinningMove(opponent);
    if (opponentWinningMove !== -1) {
      return opponentWinningMove;
    }
    const emptyCells = [...this.#findEmptyCells()];
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
}

/**  An AI player. */
class TicTacToeAIPlayer {
  #logic;
  #symbol;
  #gameManager;

  /**
   * Create and initialize an AI player.
   * @param {TicTacToeGameManager} gameManager The reference to the game manager.
   * @param {TicTacToeGrid} grid The reference to the grid.
   * @param {string} symbol 'nought' or 'cross'
   */
  constructor(gameManager, grid, symbol) {
    this.#logic = new TicTacToeAILogic(grid);
    this.#gameManager = gameManager;
    this.#symbol = symbol;
  }

  /**
   * The AI player makes the next move.
   */
  play() {
    this.#gameManager.playOnCell1D(this.#logic.findNextMove(this.#symbol));
  }
}

export default TicTacToeAIPlayer;
