import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function move(board, direction, times) {
  for (let i = 0; i < times; i++) {
    board.moveBlock(direction);
  }
}

describe("Line clears", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("One line dissolves if full", () => {
    board.loadBoard(      
      `..........
      ..........
      I.........
      I.......LL
      I.T......L
      ITTT.IIIIL`

    )
    board.drop(Tetromino.T_SHAPE);
    move(board, 'down', 5)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       I.........
       I.......LL
       I.TTTT...L`
    );
  });

  it("Two lines dissolve if full", () => {
    board.loadBoard(      
      `..........
      ..........
      I.Z.......
      IZZ....TLL
      IZT...TTTL
      ITTT.IIIIL`

    )
    board.drop(Tetromino.T_SHAPE);
    move(board, 'down', 5)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       I.Z.......
       IZZ....TLL`
    );
  });
});
