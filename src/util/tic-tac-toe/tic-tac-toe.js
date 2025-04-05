// Global constants and functions
const NOUGHT = 1;
const CROSS = -1;
const NONE = 0;

/**
 * Represents a tic-tac-toc grid.
 */
class TicTacToeGrid {
  #grid;

  /**
   * Create and initialize a tic-tac-toc grid.
   */
  constructor() {
    this.#grid = [
      [NONE, NONE, NONE],
      [NONE, NONE, NONE],
      [NONE, NONE, NONE],
    ];
  }
  /**
   * Check to see if the target cell is empty.
   * @param {number} rowIndex
   * @param {number} colIndex
   * @returns {boolean} true | false
   */
  isEmptyCell(rowIndex, colIndex) {
    return this.#grid[rowIndex][colIndex] === NONE;
  }
  /**
   * Add or change the symbol of a cell.
   * @param {number} rowIndex 0-2
   * @param {number} colIndex 0-2
   * @param {number} symbol NOUGHT or CROSS
   */
  changeCell(rowIndex, colIndex, symbol) {
    this.#grid[rowIndex][colIndex] = symbol;
  }

  /**
   * Returns the 1-d grid.
   * @returns {number[]}
   */
  get1DGrid() {
    const cells = [];
    this.#grid.forEach((row) => row.forEach((cell) => cells.push(cell)));
    return cells;
  }

  /**
   * Returns the 2-d grid.
   * @returns
   */
  get2DGrid() {
    return this.#grid;
  }
}

/**
 * Responsible for the tic-tac-toc game logic.
 */
class TicTacToeLogic {
  #grid;

  /**
   * Create and initialize the tic-tac-toc logic.
   * @param {TicTacToeGrid} grid The reference to the game grid.
   */
  constructor(grid) {
    this.#grid = grid;
  }

  /**
   * Check and returns the winner of the game. If there is a winner, also returns where they win.
   * @returns {{winner: NOUGHT | CROSS | null, where: [{row: number, col: number}] | null}}
   */
  checkWinner() {
    const grid = this.#grid.get2DGrid();
    // check rows
    for (let i = 0; i < 3; ++i) {
      if (grid[i][0] === NONE) continue;
      if (grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]) {
        return {
          winner: grid[i][0],
          where: [
            { row: i, col: 0 },
            { row: i, col: 1 },
            { row: i, col: 2 },
          ],
        };
      }
    }
    // check columns
    for (let j = 0; j < 3; ++j) {
      if (grid[0][j] === NONE) continue;
      if (grid[0][j] === grid[1][j] && grid[0][j] === grid[2][j]) {
        return {
          winner: grid[0][j],
          where: [
            { row: 0, col: j },
            { row: 1, col: j },
            { row: 2, col: j },
          ],
        };
      }
    }
    // check diagonals
    if (!(grid[1][1] === NONE)) {
      if (grid[1][1] === grid[0][0] && grid[1][1] === grid[2][2]) {
        return {
          winner: grid[1][1],
          where: [
            { row: 0, col: 0 },
            { row: 1, col: 1 },
            { row: 2, col: 2 },
          ],
        };
      }
      if (grid[1][1] === grid[0][2] && grid[1][1] === grid[2][0]) {
        return {
          winner: grid[1][1],
          where: [
            { row: 0, col: 2 },
            { row: 1, col: 1 },
            { row: 2, col: 0 },
          ],
        };
      }
    }
    // no winner found.
    return {
      winner: null,
      where: null,
    };
  }

  /**
   * Check if the game is over.
   * @returns {boolean} true | false
   */
  isGameOver() {
    // check if there is a winner.
    if (this.checkWinner().winner !== null) return true;

    // check if grid is fully occupied.
    for (let cell of this.#grid.get1DGrid()) {
      if (cell === NONE) return false;
    }
    return true;
  }
}

/**
 * Manages the tic-tac-toe game.
 */
class TicTacToeGameManager {
  #grid;
  #logic;
  #whoseTurn;
  /** @type {{winner: NOUGHT | CROSS | null, where: [{row: number, col: number}] | null}} */
  #winner;
  #gameOver = false;

  /**
   * Create and initialize a tic-tac-toe game.
   */
  constructor() {
    this.#grid = new TicTacToeGrid();
    this.#logic = new TicTacToeLogic(this.#grid);
    this.#whoseTurn = NOUGHT;
  }

  /**
   * Plays on the target cell. If it's NOUGHT's turn, NOUGHT is placed, or vice versa for CROSS.
   * @param {number} row The row index.
   * @param {number} col The column index.
   */
  playOnCell(row, col) {
    if (this.#gameOver)
      return console.log('The game is over, start another one with restart()');
    if (!this.#grid.isEmptyCell(row, col))
      return console.log('This cell is occupied, please pick another cell');
    this.#grid.changeCell(row, col, this.#whoseTurn);

    if (this.#logic.isGameOver()) {
      this.#winner = this.#logic.checkWinner();
      this.#gameOver = true;
    }
    this.#whoseTurn === NOUGHT
      ? (this.#whoseTurn = CROSS)
      : (this.#whoseTurn = NOUGHT);
  }

  /**
   * Same functionality as playOnCell but takes an 1-D index as argument.
   * @param {number} idx
   */
  playOnCell1D(idx) {
    this.playOnCell(Math.floor(idx / 3), idx % 3);
  }

  /**
   * Returns the winner of the game.
   */
  getWinner() {
    const winner = this.#winner?.winner;
    if (winner === NOUGHT) return 'nought';
    if (winner === CROSS) return 'cross';
    return null;
  }
  /**
   * Returns an array of row and column indices where the winner wins.
   */
  getWinnerLocation() {
    return this.#winner?.where ?? null;
  }

  /**
   * Returns information of the game state.
   * @returns {{state: 'finished' | 'playing',
   *            winner: 'nought' | 'cross' | 'draw' | null,
   *            turn: 'nought' | 'cross',
   *            grid1D: ('nought' | 'cross' | '')[],
   *            grid2D: ('nought' | 'cross' | '')[][]}}
   */
  getGameState() {
    const winner = this.getWinner();
    const grid1D = this.#grid.get1DGrid().map((cell) => {
      if (cell === NOUGHT) return 'nought';
      if (cell === CROSS) return 'cross';
      return '';
    });
    const grid2D = this.#grid.get2DGrid().map((row) =>
      row.map((cell) => {
        if (cell === NOUGHT) return 'nought';
        if (cell === CROSS) return 'cross';
        return '';
      })
    );

    return {
      state: this.#gameOver ? 'finished' : 'playing',
      winner: this.#gameOver ? (winner === null ? 'draw' : winner) : null,
      turn: this.#whoseTurn === NOUGHT ? 'nought' : 'cross',
      grid1D,
      grid2D,
    };
  }

  /**
   * Restart the game.
   */
  restart() {
    this.#grid = new TicTacToeGrid();
    this.#logic = new TicTacToeLogic(this.#grid);
    this.#whoseTurn = NOUGHT;
    this.#winner = undefined;
    this.#gameOver = false;
  }
}

export default TicTacToeGameManager;
