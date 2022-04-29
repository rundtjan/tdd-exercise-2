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
    board.drop(Tetromino.Z_SHAPE);
    board.moveBlock("left");
    expect(board.toString()).to.equalShape(
      `..ZZ......
       ...ZZ.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.L_SHAPE);
    board.moveBlock("right");
    expect(board.toString()).to.equalShape(
      `....LLL...
       ....L.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.I_SHAPE2);
    board.moveBlock("down");
    expect(board.toString()).to.equalShape(
      `..........
       ..IIII....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.O_SHAPE2);
    move(board, "left", 5);
    expect(board.toString()).to.equalShape(
      `OO........
       OO........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.S_SHAPE);
    move(board, "right", 5);
    expect(board.toString()).to.equalShape(
      `........SS
       .......SS.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.J_SHAPE);
    move(board, "down", 6);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...JJJ....
       .....J....`
    );
    expect(board.hasFalling(), "the block has stopped falling").to.be.false;
  });

  describe("it cannot be moved left through other blocks", () => {
    it("it detects objects on the outer limit of the block", () => {
      board.drop(Tetromino.J_SHAPE);
      move(board, "left", 3);
      move(board, "down", 6);
      board.drop(Tetromino.J_SHAPE);
      move(board, "down", 4);
      board.moveBlock("left");
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         JJJJJJ....
         ..J..J....`
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
  });

  describe("it cannot be moved right through other blocks", () => {
    it("it detects objects on the outer right limit of the block", () => {
      board.drop(Tetromino.T_SHAPE);
      move(board, "right", 3);
      move(board, "down", 6);
      board.drop(Tetromino.T_SHAPE);
      move(board, "down", 4);
      board.moveBlock("right");
      expect(board.toString()).to.equalShape(
        `..........
           ..........
           ..........
           ..........
           ....T..T..
           ...TTTTTT.`
      );
    });

    it("it detects objects with inner structures of the block", () => {
      board.drop(Tetromino.T_SHAPE);
      move(board, "right", 4);
      move(board, "down", 6);
      board.drop(Tetromino.T_SHAPE);
      move(board, "right", 3);
      move(board, "down", 4);
      board.drop(Tetromino.T_SHAPE);
      move(board, "down", 3);
      move(board, "right", 2);

      expect(board.toString()).to.equalShape(
        `..........
           ..........
           .......T..
           .....TTTT.
           ....TTT.T.
           .......TTT`
      );
    });
  });

  describe("it cannot be moved down through other blocks (will stop falling)", () => {
    it("it detects objects on the outer limit of the block", () => {
      board.drop(Tetromino.T_SHAPE);
      move(board, "down", 5);
      board.drop(Tetromino.T_SHAPE);
      move(board, "down", 4);
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ...TTT....
         ....T.....
         ...TTT....`
      );
    });
  });
});
