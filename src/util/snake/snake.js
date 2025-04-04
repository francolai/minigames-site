import { INIT_POS, INIT_SNACK_POS, NUM_COL, NUM_ROW } from './snakeInitVar';
import snakeReducer from './snakeReducer';

/**
 * Represents a snake in a m x n grid.
 */
class SnakeObject {
  #head;
  #body;
  #oldTail;
  #moveDirection;
  #bodyDirection;

  /**
   * Create and initialize a snake.
   */
  constructor() {
    this.#head = INIT_POS;
    this.#body = [
      { ...INIT_POS, col: INIT_POS.col - 1 },
      { ...INIT_POS, col: INIT_POS.col - 2 },
    ];
    this.#moveDirection = 'RIGHT';
    this.#bodyDirection = 'LEFT';
  }

  /**
   * Get the position of the snake.
   * @returns {[{row: number, col: number}]} An array of objects containing the positions of the snake body parts.
   */
  getPosition() {
    return [this.#head, ...this.#body];
  }

  /**
   * Get the opposite direction given a direction.
   * @param {string} direction The direction.
   * @returns {string} The opposite direction.
   */
  #oppositeDirection(direction) {
    if (direction === 'UP') {
      return 'DOWN';
    }
    if (direction === 'RIGHT') {
      return 'LEFT';
    }
    if (direction === 'LEFT') {
      return 'RIGHT';
    }
    if (direction === 'DOWN') {
      return 'UP';
    }
  }

  /**
   * Set the move direction of the snake.
   * @param {string} direction one of 'LEFT', 'RIGHT', 'UP', 'DOWN'
   */
  setDirection(direction) {
    if (!(this.#bodyDirection === direction)) {
      this.#moveDirection = direction;
    }
  }

  /**
   * Move the snake in the current direction by one cell.
   */
  move() {
    let prev = this.#head;
    this.#head = snakeReducer(this.#head, this.#moveDirection);
    this.#body.forEach((part, idx, arr) => {
      [arr[idx], prev] = [prev, part];
    });
    this.#oldTail = prev;
    this.#bodyDirection = this.#oppositeDirection(this.#moveDirection);
  }

  /**
   * Add body size upon eating a snack.
   * Only call this function when the snake has moved by at least one cell.
   */
  addBodyPart() {
    if (!this.#oldTail) {
      console.log(
        'addBody can only be called after moving the snake at least once.'
      );
    }
    this.#body.push(this.#oldTail);
    this.#oldTail = null;
  }
}

/**
 * Represents a snack in a m x n grid.
 */
class SnackObject {
  #position;
  /**
   * Create and initialize a snack.
   */
  constructor() {
    this.#position = INIT_SNACK_POS;
  }

  /**
   * Get the position of the snack.
   * @returns {{row: number, col: number}} The position of the snack.
   */
  getPosition() {
    return this.#position;
  }
  /**
   * Set the new position of the snack.
   * @param {{row: number, col: number}} newPosition The new position of the snack.
   */
  setPosition(newPosition) {
    this.#position = newPosition;
  }
}

/**
 * Responsible for the snake game logic.
 */
class SnakeGameLogic {
  #snake;
  #snack;
  /**
   * Create and initialize the snake game logic.
   * @param {SnakeObject} snake The reference to the snake object.
   * @param {SnackObject} snack The reference to the snack object.
   */
  constructor(snake, snack) {
    this.#snake = snake;
    this.#snack = snack;
  }
  /**
   * Convert 2-D index to 1-D.
   * @param {{row: number, col: number}} twoDIndex The 2-D index.
   * @returns {number} The 1-D index.
   */
  #convertTo1DIndex(twoDIndex) {
    return twoDIndex.row * NUM_COL + twoDIndex.col;
  }

  /**
   * Convert 1-D index to 2-D.
   * @param {number} oneDIndex The 1-D index.
   * @returns {{row: number, col: number}}  The 2-D index.
   */
  #convertTo2DIndex(oneDIndex) {
    return { row: Math.floor(oneDIndex / NUM_COL), col: oneDIndex % NUM_COL };
  }

  /**
   * Checks if the snake head collides with its body or with the snack.
   * @returns {{collided: true | false, target: 'body' | 'snack' | null}}
   */
  checkSnakeHeadCollision() {
    const snakePos = this.#snake.getPosition();
    const snakeHead = snakePos.shift();
    if (
      this.#convertTo1DIndex(snakeHead) ===
      this.#convertTo1DIndex(this.#snack.getPosition())
    ) {
      return { collided: true, target: 'snack' };
    }
    for (let snakeBody of snakePos) {
      if (
        this.#convertTo1DIndex(snakeHead) === this.#convertTo1DIndex(snakeBody)
      ) {
        return { collided: true, target: 'body' };
      }
    }

    return { collided: false, target: null };
  }
  /**
   * Returns a new random position of the snack.
   * @returns {{row: number, col: number}}
   */
  generateNewSnackPosition() {
    const occupiedPos = [
      ...this.#snake.getPosition().map((pos) => this.#convertTo1DIndex(pos)),
      this.#convertTo1DIndex(this.#snack.getPosition()),
    ];
    const possibleNewSnackPos = [...Array(NUM_ROW * NUM_COL).keys()].filter(
      (num) => !occupiedPos.includes(num)
    );
    return this.#convertTo2DIndex(
      possibleNewSnackPos[
        Math.floor(Math.random() * possibleNewSnackPos.length)
      ]
    );
  }
}

/**
 * A class to manage the snake game state.
 */
class SnakeGameManager {
  #snake;
  #snack;
  #gameLogic;
  #gameOver;
  #score;

  /**
   * Create and initialize a new snake game state manager.
   */
  constructor() {
    this.#snake = new SnakeObject();
    this.#snack = new SnackObject();
    this.#gameLogic = new SnakeGameLogic(this.#snake, this.#snack);
    this.#gameOver = false;
    this.#score = 0;
  }

  /**
   * Get the current score.
   * @returns {number}
   */
  getScore() {
    return this.#score;
  }
  /**
   * Get the positions of the snake and the snack.
   * @returns {{snakePos: [{row: number, col: number}], snackPos: {row:number, col: number}}}
   */
  getPositions() {
    return {
      snakePos: this.#snake.getPosition(),
      snackPos: this.#snack.getPosition(),
    };
  }
  /**
   * Move the snake by one cell.
   */
  moveSnake() {
    if (this.#gameOver) {
      console.log('the game is over, start a new one with restart()');
      return;
    }
    this.#snake.move();
    const { collided, target } = this.#gameLogic.checkSnakeHeadCollision();
    if (collided) {
      if (target === 'snack') {
        this.#snack.setPosition(this.#gameLogic.generateNewSnackPosition());
        this.#snake.addBodyPart();
        this.#score++;
      }
      if (target === 'body') {
        this.#gameOver = true;
        return;
      }
    }
  }

  /**
   * Change the snake move direction.
   * @param {string} direction one of 'LEFT', 'RIGHT', 'UP', 'DOWN'
   */
  changeSnakeDirection(direction) {
    this.#snake.setDirection(direction);
  }

  /**
   * Check if the game is over.
   * @returns {boolean}
   */
  isGameOver() {
    return this.#gameOver;
  }

  /**
   * Restart the game.
   */
  restart() {
    this.#snake = new SnakeObject();
    this.#snack = new SnackObject();
    this.#gameLogic = new SnakeGameLogic(this.#snake, this.#snack);
    this.#gameOver = false;
    this.#score = 0;
  }
}

export default SnakeGameManager;
