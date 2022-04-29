import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function move(board, direction, times) {
  for (let i = 0; i < times; i++) {
    board.moveBlock(direction);
  }
}

describe("Rotating falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("a tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE2);
    board.toString()
    board.rotateBlockLeft();
    expect(board.toString()).to.equalShape(
      `....TT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE2);
    board.rotateBlockRight();
    expect(board.toString()).to.equalShape(
      `...TT.....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a rotated tetromino stops correctly at the bottom", () => {
    board.drop(Tetromino.T_SHAPE2);
    board.rotateBlockRight();
    move(board, 'down', 4);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.....
       ...TT.....
       ....T.....`
    );
  });

  it("a rotated tetromino stops correctly at the lefthandside", () => {
    board.drop(Tetromino.I_SHAPE2);
    board.rotateBlockRight();
    move(board, 'left', 4);
    expect(board.toString()).to.equalShape(
      `I.........
       I.........
       I.........
       ..........
       ..........
       ..........`
    );
  });

  it("a rotated tetromino stops correctly at the righthandside", () => {
    board.drop(Tetromino.T_SHAPE2);
    board.rotateBlockLeft();
    move(board, 'right', 77);
    expect(board.toString()).to.equalShape(
      `........TT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a rotated tetromino cannot be moved right through other block", () => {
    board.drop(Tetromino.T_SHAPE2);
    board.rotateBlockRight();
    move(board, 'right', 2);
    move(board, 'down', 5);
    board.drop(Tetromino.T_SHAPE2);
    board.rotateBlockRight();
    move(board, 'down', 4);
    move(board, 'right', 2);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.T...
       ...TTTT...
       ....T.T...`
    );
  });

  it("a rotated tetromino cannot be moved left through other block", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockRight();
    move(board, 'left', 2);
    move(board, 'down', 4);
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockRight();
    move(board, 'down', 3);
    move(board, 'left', 2);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.T.....
       ..TTTT....
       ..T.T.....`
    );
  });

  it("a tetromino cannot be rotated left if blocked by other block", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockRight();
    move(board, 'left', 2);
    move(board, 'down', 4);
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockRight();
    move(board, 'down', 3);
    board.rotateBlockLeft()
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.T.....
       ..TTTT....
       ..T.T.....`
    );
  });

  it("a tetromino cannot be rotated right if blocked by other block", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockRight();
    move(board, 'right', 1);
    move(board, 'down', 4);
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockLeft();
    move(board, 'down', 3);
    board.rotateBlockRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....TT....
       ...TTTT...
       ....TT....`
    );
  });

  it("a tetromino at left edge can rotate if there is room to the right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockRight();
    move(board, 'left', 4);
    board.rotateBlockLeft();
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a tetromino at left edge cannot rotate if there is no room to the right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockRight();
    move(board, 'left', 2);
    move(board, 'down', 4)
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockLeft();
    move(board, 'left', 3)
    move(board, 'down', 3)
    board.rotateBlockLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .TT.......
       TTTT......
       .TT.......`
    );
  });

  it("a tetromino at right edge can rotate if there is room to the left", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateBlockRight();
    move(board, 'right', 5);
    board.rotateBlockRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ......IIII
       ..........
       ..........
       ..........`
    );
  });

  it("a tetromino at right edge cannot rotate if there is no room to the left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockLeft();
    move(board, 'right', 3);
    move(board, 'down', 4);
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockLeft();
    move(board, 'right', 5);
    move(board, 'down', 3);
    board.rotateBlockLeft();
    console.log(board.toString())
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .......T.T
       ......TTTT
       .......T.T`
    );
  });
});
