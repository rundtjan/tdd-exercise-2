import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function move(board, direction, times) {
  for (let i = 0; i < times; i++) {
    board.moveBlock(direction);
  }
}

describe("Moving falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlock("left");
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
    board.moveBlock("right");
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
    board.moveBlock("down");
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
    move(board, "left", 4);
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
    move(board, "right", 5);
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
    move(board, "down", 6);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
    expect(board.hasFalling(), "the block has stopped falling").to.be.false;
  });

  describe("it cannot be moved left through other blocks", () => {
    it("it detects objects on the outer limit of the block", () => {
      board.drop(Tetromino.T_SHAPE);
      move(board, "left", 3);
      move(board, "down", 6);
      board.drop(Tetromino.T_SHAPE);
      move(board, "down", 4);
      board.moveBlock("left");
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         .T..T.....
         TTTTTT....`
      );
    });

    it("it detects objects with inner structures of the block", () => {
      board.drop(Tetromino.T_SHAPE);
      move(board, "left", 3);
      move(board, "down", 6);
      board.drop(Tetromino.T_SHAPE);
      move(board, "left", 2);
      move(board, "down", 3);
      board.drop(Tetromino.T_SHAPE);
      board.moveBlock("right");
      move(board, "down", 3);
      move(board, "left", 2);

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..T.......
         .TTTT.....
         .T.TTT....
         TTT.......`
      );
    });

    describe("it cannot be moved right through other blocks", () => {
      xit("it detects objects on the outer right limit of the block", () => {
        board.drop(Tetromino.T_SHAPE);
        move(board, "right", 3);
        move(board, "down", 6);
        board.drop(Tetromino.T_SHAPE);
        move(board, 'down', 4)
        board.moveBlock('right');
        expect(board.toString()).to.equalShape(
          `..........
           ..........
           ..........
           ..........
           ....T..T..
           ...TTTTTT.`
        );
      });

      xit("it detects objects with inner structures of the block", () => {
        board.drop(Tetromino.T_SHAPE);
        move(board, "left", 3);
        move(board, "down", 6);
        board.drop(Tetromino.T_SHAPE);
        move(board, "left", 2);
        move(board, "down", 3);
        board.drop(Tetromino.T_SHAPE);
        board.moveBlock("right");
        move(board, "down", 3);
        move(board, "left", 2);

        expect(board.toString()).to.equalShape(
          `..........
           ..........
           ..T.......
           .TTTT.....
           .T.TTT....
           TTT.......`
        );
      });
    });
  });
});
