export class Board {
  width;
  height;

  constructor(width, height) {
    this.board = new Array(height);
    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(width);
      for (var j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = ".";
      }
    }
    this.middle = width % 2 === 0 ? width / 2 - 1 : Math.floor(width / 2);
    this.falling = false;
  }

  drop(block) {
    if (this.falling) throw "already falling";
    let start =
      block.getSize() === 1
        ? this.middle
        : this.middle - Math.floor(block.getSize() / 2);
    let [y, x] = [0, start];
    this.falling = { block, y, x };
  }

  eraseBlock() {
    if (this.falling.block.getSize() === 1)
      this.board[this.falling.y][this.falling.x] = ".";
    else {
      for (var i = 0; i < this.falling.block.getSize(); i++) {
        for (var j = 0; j < this.falling.block.getSize(); j++) {
          if (this.falling.block.getShape()[i][j] != ".")
            this.board[this.falling.y + i][this.falling.x + j] = ".";
        }
      }
    }
  }

  moveFallingLeft(){
    this.eraseBlock();
    this.falling.x--;
  }

  drawOnBoard() {
    if (this.falling) {
      if (this.falling.block.getSize() === 1) {
        this.board[this.falling.y][this.falling.x] = this.falling.block.toString();
      } else {
        for (var i = 0; i < this.falling.block.getSize(); i++) {
          for (var j = 0; j < this.falling.block.getSize(); j++) {
            if (this.falling.block.getShape()[i][j] != ".")
              this.board[this.falling.y + i][this.falling.x + j] =
                this.falling.block.getShape()[i][j];
          }
        }
      }
    }
    return this.board;
  }

  hasFalling() {
    return !this.falling === false;
  }

  tick() {
    if (this.falling && this.blockCanFall()) {
      this.eraseBlock();
      this.falling.y++;
    } else {
      this.drawOnBoard()
      this.falling = false;
    }
  }

  blockCanFall() {
    let canFall = true;
    for (let i = this.falling.block.getSize() - 1; i >= 0; i--) {
      for (let j = 0; j < this.falling.block.getSize(); j++) {
        if (this.falling.block.getShape()[i][j] != ".") {
          if (this.falling.y + i === this.board.length - 1) {
            canFall = false;
            } else if (this.board[this.falling.y + i + 1][this.falling.x + j] != "."){
              if (i === this.falling.block.getSize() - 1) {
                canFall = false;
              } else if (this.falling.block.getShape()[i+1][j] === '.'){
                canFall = false;
              }
            }
          }
        }
      }
    return canFall;
  }

  toString() {
    this.drawOnBoard();
    var output = "";
    this.board.forEach((elem) => {
      elem.forEach((elemint) => {
        if (elemint === ".") output += elemint;
        else output += elemint.toString();
      });
      output += "\n";
    });
    return output;
  }
}
