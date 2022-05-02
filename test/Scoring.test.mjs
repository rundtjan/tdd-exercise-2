import { expect } from "chai";
import sinon from "sinon";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ScoreCounter } from '../src/ScoreCounter.mjs';

function move(board, direction, times) {
  for (let i = 0; i < times; i++) {
    board.moveBlock(direction);
  }
}

describe("Scoring", () => {
  let board, scoreCounter;
  beforeEach(() => {
    board = new Board(10, 6);
    scoreCounter = new ScoreCounter
  });

  it("A listener can be added to the board", () => {
    let dummy = {}
    board.addListener(dummy);

    expect(board.listeners.length).to.equal(1);
  });

  it("The listener gets called when a line is cleared", () => {
    let mock = sinon.fake()
    board.addListener(mock);
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
    expect(mock.calledOnce).to.be.true;
  });

  it("The listener gets called with the amount of lines cleared", () => {
    let mock = sinon.fake()
    board.addListener(mock);
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
  
    expect(mock.calledWith(2)).to.be.true;
  });

  it("The scorecounter can calculate scores for line clears of 1 at a time", () => {
    scoreCounter.update(1);
    expect(scoreCounter.getScore()).to.equal(40);
  });

  xit("Two lines dissolve if full, no matter space between them", () => {
    board.loadBoard(      
      `..........
      ...I..J...
      I.ZI..J...
      IZZI.JJTLL
      IZTI..TTTL
      ITTT.IIIIL`

    )
    board.drop(Tetromino.I_SHAPE);
    board.rotateBlockRight()
    move(board, 'down', 4)

    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ...I..J...
      I.ZII.J...
      IZTII.TTTL`
    );
  });

  xit("Nothing dissolves if no full lines", () => {
    board.loadBoard(      
      `..........
      ..........
      I.........
      I.......LL
      I.T....T.L
      ITTT..TTTL`

    )
    board.drop(Tetromino.T_SHAPE);
    move(board, 'down', 5)

    expect(board.toString()).to.equalShape(
     `..........
      ..........
      I.........
      I.......LL
      I.TTTT.T.L
      ITTTT.TTTL`
    );
  });
});
