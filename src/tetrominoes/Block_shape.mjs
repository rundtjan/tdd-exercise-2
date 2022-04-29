export class Block_shape {

  constructor(symbol) {
    this.shape = this.createShape(symbol);
    //this.direction = shape;
    this.rotates = this.rotatable();
  }

  rotatable() {
    return false;
  }

  getSize() {
    return 1;
  }

  getStartRow() {
    return 0;
  }

  getShape(){
    return this.shape;
  }

  createShape(symbol) {
    let shapes = [
      [[symbol]],
    ];
    return shapes[0];
  }
  
  rotateRight() {
    this.rotate()
  }

  rotate() {
    return this;
  }

  rotateLeft() {
    this.rotate()
  }

  toString() {
    return this.shape[0][0];
  }
}
