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
      this.board[i] = new Array(width)
      for (var j = 0; j < this.grid[i].length; j++) {
        this.board[i][j] = ".";
      }
    }
    this.middle = (width % 2 === 0 ? width / 2 - 1 : Math.floor(width / 2));
    this.falling = false;
    this.fallingBlock = 0;
  }

  drop(block) {
    if (this.falling) throw "already falling";
    else block.setNumber(this.fallingBlock);
    console.log('middle ', this.middle)
    let start = (block.getSize() === 1 ? this.middle : this.middle - Math.floor(block.getSize() / 2))
    this.board[0][start] = block;
    console.log('will start at grid[0][', start)
    this.falling = true;
  }

  hasFalling() {
    return this.falling;
  }

  tick() {
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

  toString() {
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
