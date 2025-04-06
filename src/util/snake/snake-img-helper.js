import { NUM_COL, NUM_ROW } from './snakeInitVar';

import headDown from '/src/assets/snake/head_down.png';
import headUp from '/src/assets/snake/head_up.png';
import headLeft from '/src/assets/snake/head_left.png';
import headRight from '/src/assets/snake/head_right.png';
import tailDown from '/src/assets/snake/tail_down.png';
import tailUp from '/src/assets/snake/tail_up.png';
import tailLeft from '/src/assets/snake/tail_left.png';
import tailRight from '/src/assets/snake/tail_right.png';
import bodyHorizontal from '/src/assets/snake/body_horizontal.png';
import bodyVertical from '/src/assets/snake/body_vertical.png';
import bodyBottomLeft from '/src/assets/snake/body_bottomleft.png';
import bodyBottomRight from '/src/assets/snake/body_bottomright.png';
import bodyTopLeft from '/src/assets/snake/body_topleft.png';
import bodyTopRight from '/src/assets/snake/body_topright.png';

function deduceHeadImg(
  { row: headRow, col: headCol },
  { row: bodyRow, col: bodyCol }
) {
  // body on the left
  if (bodyRow === headRow && (headCol + NUM_COL - 1) % NUM_COL === bodyCol) {
    return headRight;
  }
  // body on the right
  if (bodyRow === headRow && (headCol + NUM_COL + 1) % NUM_COL === bodyCol) {
    return headLeft;
  }
  // body on top
  if (bodyCol === headCol && (headRow + NUM_ROW - 1) % NUM_ROW === bodyRow) {
    return headDown;
  }
  //body on bottom
  if (bodyCol === headCol && (headRow + NUM_ROW + 1) % NUM_ROW === bodyRow) {
    return headUp;
  }
}

function deduceTailImg(
  { row: tailRow, col: tailCol },
  { row: bodyRow, col: bodyCol }
) {
  // body on the left
  if (bodyRow === tailRow && (tailCol + NUM_COL - 1) % NUM_COL === bodyCol) {
    return tailRight;
  }
  // body on the right
  if (bodyRow === tailRow && (tailCol + NUM_COL + 1) % NUM_COL === bodyCol) {
    return tailLeft;
  }
  // body on top
  if (bodyCol === tailCol && (tailRow + NUM_ROW - 1) % NUM_ROW === bodyRow) {
    return tailDown;
  }
  //body on bottom
  if (bodyCol === tailCol && (tailRow + NUM_ROW + 1) % NUM_ROW === bodyRow) {
    return tailUp;
  }
}

function deduceBodyImg(
  { row: bodyRow, col: bodyCol },
  { row: prevRow, col: prevCol },
  { row: nextRow, col: nextCol }
) {
  // body horizontal
  if (bodyRow === prevRow && bodyRow === nextRow) {
    return bodyHorizontal;
  }
  // body vertical
  if (bodyCol === prevCol && bodyCol === nextCol) {
    return bodyVertical;
  }
  // body topleft
  if (
    ((bodyCol + NUM_COL - 1) % NUM_COL === prevCol &&
      (bodyRow + NUM_ROW - 1) % NUM_ROW === nextRow) ||
    ((bodyCol + NUM_COL - 1) % NUM_COL === nextCol &&
      (bodyRow + NUM_ROW - 1) % NUM_ROW === prevRow)
  ) {
    return bodyTopLeft;
  }
  // body topright
  if (
    ((bodyCol + NUM_COL + 1) % NUM_COL === prevCol &&
      (bodyRow + NUM_ROW - 1) % NUM_ROW === nextRow) ||
    ((bodyCol + NUM_COL + 1) % NUM_COL === nextCol &&
      (bodyRow + NUM_ROW - 1) % NUM_ROW === prevRow)
  ) {
    return bodyTopRight;
  }
  // body bottomleft
  if (
    ((bodyCol + NUM_COL - 1) % NUM_COL === prevCol &&
      (bodyRow + NUM_ROW + 1) % NUM_ROW === nextRow) ||
    ((bodyCol + NUM_COL - 1) % NUM_COL === nextCol &&
      (bodyRow + NUM_ROW + 1) % NUM_ROW === prevRow)
  ) {
    return bodyBottomLeft;
  }
  // body bottomright
  if (
    ((bodyCol + NUM_COL + 1) % NUM_COL === prevCol &&
      (bodyRow + NUM_ROW + 1) % NUM_ROW === nextRow) ||
    ((bodyCol + NUM_COL + 1) % NUM_COL === nextCol &&
      (bodyRow + NUM_ROW + 1) % NUM_ROW === prevRow)
  ) {
    return bodyBottomRight;
  }
}
export { deduceHeadImg, deduceTailImg, deduceBodyImg };
