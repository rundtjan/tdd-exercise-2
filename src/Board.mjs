export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array(height);
    this.board = new Array(height);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(width);
      this.board[i] = new Array(width);
      for (var j = 0; j < this.grid[i].length; j++) {
        this.board[i][j] = ".";
      }
    }
    this.middle = width % 2 === 0 ? width / 2 - 1 : Math.floor(width / 2);
    this.falling = false;
    this.fallingBlock = 0;
    this.fallingPosition;
  }

  drop2(block) {
    if (this.falling) throw "already falling";
    else block.setNumber(this.fallingBlock);
    let start =
      block.getSize() === 1
        ? this.middle
        : this.middle - Math.floor(block.getSize() / 2);
    this.drawOnBoard(block, start);
    let [y, x] = [0, start];
    this.falling = { block, y, x };
  }

  drop(block) {
    if (this.falling) throw "already falling";
    else block.setNumber(this.fallingBlock);
    let start =
      block.getSize() === 1
        ? this.middle
        : this.middle - Math.floor(block.getSize() / 2);
    let [y, x] = [0, start];
    this.falling = { block, y, x };
  }

  drawOnBoard(block, start) {
    if (block.getSize() === 1) {
      this.board[0][start] = block;
    } else {
      for (var i = 0; i < block.getSize(); i++) {
        for (var j = 0; j < block.getSize(); j++) {
          this.board[0 + i][start + j] = block.getShape()[i][j];
        }
      }
    }
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

  drawOnBoard2(image) {
    if (this.falling) {
      if (this.falling.block.getSize() === 1) {
        image[this.falling.y][this.falling.x] = this.falling.block.toString();
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
    return image;
  }

  hasFalling() {
    return !this.falling === false;
  }

  tick() {
    if (this.falling && this.blockCanFall()) {
      this.eraseBlock();
      this.falling.y++;
    } else {
      this.board = this.drawOnBoard2(this.board)
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

  tick2() {
    for (var i = this.height - 1; i >= 0; i--) {
      for (var j = 0; j < this.width; j++) {
        if (this.board[i][j] != ".") {
          if (this.board[i][j].getNumber() === this.fallingBlock) {
            if (i === this.height - 1) {
              this.fallingBlock++;
              this.falling = false;
            } else if (i < this.height - 1 && this.board[i + 1][j] === ".") {
              this.board[i + 1][j] = this.board[i][j];
              this.board[i][j] = ".";
            } else {
              this.fallingBlock++;
              this.falling = false;
            }
          }
        }
      }
    }
  }

  toString2() {
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

  toString() {
    let image = this.board.slice();
    image = this.drawOnBoard2(image);
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
