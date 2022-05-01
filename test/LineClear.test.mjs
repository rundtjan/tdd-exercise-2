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
    expect(
      board.hasFalling(),
      "the player should still be able to move the block"
    ).to.be.false;

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       I.........
       I.......LL
       I.TTTT...L`
    );
  });
});
