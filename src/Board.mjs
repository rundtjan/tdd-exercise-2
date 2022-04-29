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

  rotateBlockLeft() {
    if (this.canRotate("left")) {
      this.eraseBlock();
      this.falling.block = this.falling.block.rotateLeft();
    }
  }

  checkTurningSpace(direction, edge) {
    console.log('gets called with ', direction, edge)
    let testX;
    switch (edge) {
      case "leftEdge":
        testX = 0;
        break;
      case "rightEdge":
        testX = this.falling.x - 1;
    }
   if (this.newPositionOk(direction, testX)){
     this.falling.x = testX;
     return true;
   } else {
     return false;
   };
  }

  canRotate(direction) {
    if (!this.falling.block.rotatable()) return;
    if (this.falling.x < 0) return this.checkTurningSpace(direction, "leftEdge");
    else if (
      this.falling.x + this.falling.block.getSize() >
      this.board[0].length
    )
      return this.checkTurningSpace(direction, "rightEdge");
    return this.newPositionOk(direction, this.falling.x);
  }

  newPositionOk(direction, testX){
    let testBlock;
    switch (direction) {
      case "left":
        testBlock = this.falling.block.rotateLeft();
        break;
      case "right":
        testBlock = this.falling.block.rotateRight();
    }
    this.eraseBlock()
    for (let i = 0; i < testBlock.getSize(); i++) {
      for (let j = 0; j < testBlock.getSize(); j++) {
        if (
          testBlock.getShape()[i][j] != "." &&
          this.board[this.falling.y + i][testX + j] != "."
        ) {
          return false;
        }
      }
    }
    this.falling.x = testX;
    return true;
  }

  rotateBlockRight() {
    if (this.canRotate("right")) {
      this.eraseBlock();
      this.falling.block = this.falling.block.rotateRight();
    }
  }

  moveBlock(direction) {
    if (!this.falling) return;
    this.eraseBlock();
    switch (direction) {
      case "left":
        if (this.canMoveLeft()) this.falling.x--;
        break;
      case "right":
        if (this.canMoveRight()) this.falling.x++;
        break;
      case "down":
        if (this.canMoveDown()) this.falling.y++;
        else {
          this.drawOnBoard();
          this.falling = false;
        }
        break;
    }
  }

  canMoveRight() {
    for (let i = this.falling.block.getSize() - 1; i >= 0; i--) {
      for (let j = 0; j < this.falling.block.getSize(); j++) {
        if (
          this.falling.block.getShape()[i][j] != "." &&
          this.board[this.falling.y + i][this.falling.x + j + 1] != "."
        ) {
          if (j === this.falling.block.getSize() - 1) return false;
          else if (this.falling.block.getShape()[i][j + 1] === ".")
            return false;
        }
      }
    }
    return true;
  }

  canMoveLeft() {
    for (let i = this.falling.block.getSize() - 1; i >= 0; i--) {
      for (let j = 0; j < this.falling.block.getSize(); j++) {
        if (
          this.falling.block.getShape()[i][j] != "." &&
          this.falling + j === 0
        )
          return false;
        else if (
          this.falling.block.getShape()[i][j] != "." &&
          this.board[this.falling.y + i][this.falling.x + j - 1] != "."
        ) {
          if (j === 0) return false;
          else if (this.falling.block.getShape()[i][j - 1] === ".")
            return false;
        }
      }
    }
    return true;
  }

  canMoveDown() {
    for (let i = this.falling.block.getSize() - 1; i >= 0; i--) {
      for (let j = 0; j < this.falling.block.getSize(); j++) {
        if (this.falling.block.getShape()[i][j] != ".") {
          if (this.falling.y + i === this.board.length - 1) {
            return false;
          } else if (
            this.board[this.falling.y + i + 1][this.falling.x + j] != "."
          ) {
            if (i === this.falling.block.getSize() - 1) {
              return false;
            } else if (this.falling.block.getShape()[i + 1][j] === ".") {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  drawOnBoard() {
    if (this.falling) {
      if (this.falling.block.getSize() === 1) {
        this.board[this.falling.y][this.falling.x] =
          this.falling.block.toString();
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
    if (this.falling && this.canMoveDown()) {
      this.eraseBlock();
      this.falling.y++;
    } else {
      this.drawOnBoard();
      this.falling = false;
    }
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
