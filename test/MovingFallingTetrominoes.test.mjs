
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Moving falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlock('left');
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlock('right')
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlock('down')
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlock('left');
    board.moveBlock('left');
    board.moveBlock('left');
    board.moveBlock('left');
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlock('right');
    board.moveBlock('right');
    board.moveBlock('right');
    board.moveBlock('right');
    board.moveBlock('right');
    board.moveBlock('right');
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlock('down')
    board.moveBlock('down')
    board.moveBlock('down')
    board.moveBlock('down')
    board.moveBlock('down')
    board.moveBlock('down')
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
    expect(
      board.hasFalling(),
      "the block has stopped falling"
    ).to.be.false;
  });

  it("it cannot be moved left through other blocks (developing test)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlock('left');
    board.moveBlock('left');
    board.moveBlock('left');
    board.moveBlock('down');
    board.moveBlock('down');
    board.moveBlock('down');
    board.moveBlock('down');
    board.moveBlock('down');
    board.moveBlock('down');
    board.drop(Tetromino.T_SHAPE);
    board.moveBlock('down');
    board.moveBlock('down');
    board.moveBlock('down');
    board.moveBlock('down');
    board.moveBlock('left');
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .T..T.....
       TTTTTT....`
    );
  });
});
