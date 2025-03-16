import { NUM_ROW, NUM_COL } from './snakeInitVar.js';

function mod(n, m) {
  return ((n % m) + m) % m;
}
function snakeHeadReducer(state, action) {
  switch (action) {
    case 'LEFT':
      return { ...state, col: mod(state.col - 1, NUM_COL) };
    case 'RIGHT':
      return { ...state, col: mod(state.col + 1, NUM_COL) };
    case 'UP':
      return { ...state, row: mod(state.row - 1, NUM_ROW) };
    case 'DOWN':
      return { ...state, row: mod(state.row + 1, NUM_ROW) };
  }
}

export default snakeHeadReducer;
