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

describe("Picking random blocks", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("The board has a method that picks a new block", () => {
    expect(board.getBlock()).to.be.an('object');
  });

  it("The board picks different blocks", () => {
    let tetros = [];
    let i = 0;
    while (true) {tetros.push(board.getBlock()); i++; if (i === 10) break;};
    expect(tetros.filter(elem => elem.toString() != tetros[0].toString()).length).to.not.equal(0);
  });

  it("The board picks different blocks from a shufflebag", () => {
    expect(board.shuffleBag.length).to.equal(70);
    let tetros = [];
    let i = 0;
    while (true) {tetros.push(board.getBlock()); i++; if (i === 10) break;};
    expect(board.shuffleBag.length).to.equal(60);
  });

  it("All blocks are equally represented", () => {
    let tetros = [];
    let i = 0;
    while (true) {tetros.push(board.getBlock()); i++; if (i === 70) break;};
    expect(board.shuffleBag.length).to.equal(0);
    expect(tetros.filter(elem => elem.whoAmI() === 'I_SHAPE').length).to.equal(10);
    expect(tetros.filter(elem => elem.whoAmI() === 'J_SHAPE').length).to.equal(10);
    expect(tetros.filter(elem => elem.whoAmI() === 'L_SHAPE').length).to.equal(10);
    expect(tetros.filter(elem => elem.whoAmI() === 'Z_SHAPE').length).to.equal(10);
    expect(tetros.filter(elem => elem.whoAmI() === 'T_SHAPE').length).to.equal(10);
    expect(tetros.filter(elem => elem.whoAmI() === 'S_SHAPE').length).to.equal(10);
    expect(tetros.filter(elem => elem.whoAmI() === 'O_SHAPE').length).to.equal(10);
  });

});
