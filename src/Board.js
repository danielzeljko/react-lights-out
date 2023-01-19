import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let row = 0; row < nrows; row++) {
      const tempRow = [];
      for (let col = 0; col < ncols; col++) {
        const cell = Math.random() < chanceLightStartsOn;
        tempRow.push(cell);
      }
      initialBoard.push(tempRow);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      console.log("y,x", y, x);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const tempBoard = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, tempBoard); //samecell
      flipCell(y + 1, x, tempBoard); //below
      flipCell(y - 1, x, tempBoard); //above
      flipCell(y, x + 1, tempBoard); //right
      flipCell(y, x - 1, tempBoard); //left

      // tempBoard[y][x] === 't' ? tempBoard[y][x] = 'f' : tempBoard[y][x] = 't';
      // tempBoard[y + 1][x] === 't' ? tempBoard[y + 1][x] = 'f' : tempBoard[y + 1][x] = 't'; //below
      // tempBoard[y - 1][x] === 't' ? tempBoard[y - 1][x] = 'f' : tempBoard[y - 1][x] = 't'; //above
      // tempBoard[y][x - 1] === 't' ? tempBoard[y][x - 1] = 'f' : tempBoard[y][x - 1] = 't'; //left
      // tempBoard[y][x + 1] === 't' ? tempBoard[y][x + 1] = 'f' : tempBoard[y][x + 1] = 't'; //right
      // TODO: return the copy

      return tempBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  const table = [];

  for (let i = 0; i < nrows; i++) {
    const nextTR = [];
    for (let j = 0; j < ncols; j++) {
      nextTR.push(<Cell isLit={board[j][i]} key={`${j}-${i}`} flipCellsAroundMe={() => flipCellsAround(`${j}-${i}`)} />);
    }
    table.push(<tr key={i}>{nextTR}</tr>);
  }

  return (
    <table>
      <tbody>
        {table}
      </tbody>
    </table>
  );
}

export default Board;
