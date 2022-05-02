import { Tetromino } from "./Tetromino.mjs";

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
    this.listeners = [];
    this.level = 0;
    this.shuffleBag = this.shuffle();
  }

  shuffle(){
    let bag = [];
    for (let i = 0; i < 70; i++){
      bag.push(Tetromino.choose(Math.floor(i/10)));
    }
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = bag[i];
      bag[i] = bag[j];
      bag[j] = temp;
    }
    return bag;
  }

  getBlock(){
    if (this.shuffleBag.length === 0) this.shuffleBag = this.shuffle();
    return this.shuffleBag.pop();
  }

  addListener(listener){
    this.listeners.push(listener);
  }

  emitEvent(event){
    this.listeners.forEach(listener => listener.update(event, this.level));
  }

  levelUp(){
    this.level++;
  }

  loadBoard(board) {
    let boardArr = board.split('\n');
    for (let i = 0; i < this.board.length; i++){
      for (let j = 0; j < this.board[i].length; j++){
        this.board[i][j] = boardArr[i].replace(/\s/g, "")[j];
      }
    }
  }

  drop(block) {
    if (this.falling) throw "already falling";
    let start =
      block.getSize() === 1
        ? this.middle
        : this.middle - Math.floor(block.getSize() / 2);
    let [y, x] = [0, start];
    if (block.getStartRow) y -= block.getStartRow();
    this.falling = { block, y, x };
  }

  getStartIndex(){
    let start;
    this.falling.y < 0 ? start = Math.abs(this.falling.y) : start = 0;
    return start;
  }

  eraseBlock() {
    if (this.falling.block.getSize() === 1)
      this.board[this.falling.y][this.falling.x] = ".";
    else {
      for (var i = this.getStartIndex(); i < this.falling.block.getSize(); i++) {
        for (var j = 0; j < this.falling.block.getSize(); j++) {
          if (this.falling.block.getShape()[i][j] != ".")
            this.board[this.falling.y + i][this.falling.x + j] = ".";
        }
      }
    }
  }

  rotateBlockLeft() {
    if (this.canRotate("left")) {
      this.falling.block = this.falling.block.rotateLeft();
    }
  }

  rotateBlockRight() {
    if (this.canRotate("right")) {
      this.falling.block = this.falling.block.rotateRight();
    }
  }

  checkTurningSpace(direction, edge) {
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
    if (!this.falling || !this.falling.block.rotatable()) return;
    if (this.newPositionOk(direction, this.falling.x)) return true;
    if (this.falling.x < 0) return this.checkTurningSpace(direction, "leftEdge");
    else if (
      this.falling.x + this.falling.block.getSize() >
      this.board[0].length
    )
      return this.checkTurningSpace(direction, "rightEdge");
  }

  newPositionOk(direction, testX){
    let testBlock;
    switch (direction) {
      case "left":
        testBlock = this.falling.block.rotateLeft();
        break;
      case "right":
        testBlock = this.falling.block.rotateRight();
        break;
      case "same":
        testBlock = this.falling.block;
    }
    this.eraseBlock()
    for (let i = this.getStartIndex(); i < testBlock.getSize(); i++) {
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



  moveBlock(direction) {
    if (!this.falling) return;
    this.eraseBlock();
    switch (direction) {
      case "left":
        this.newPositionOk('same', this.falling.x - 1);
        break;
      case "right":
        this.newPositionOk('same', this.falling.x + 1);
        break;
      case "down":
        if (this.canMoveDown()) this.falling.y++;
        else {
          this.landBlock()
        }
        break;
    }
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
        for (var i = this.getStartIndex(); i < this.falling.block.getSize(); i++) {
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
      this.landBlock();
    }
  }

  landBlock() {
    this.drawOnBoard();
    this.falling = false;
    let newBoard = this.board.filter(elem => {if (elem.includes('.')) return elem;})
    if (newBoard.length < this.board.length){
      let lines = this.board.length - newBoard.length;
      for (let i = 0; i < lines; i++) newBoard.unshift(this.board[0].map(() => '.'))
      this.board = newBoard.slice();
      this.emitEvent(lines);
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
