export class Z_shape {

  constructor(shape = 0) {
    this.shape = this.createShape(shape);
    this.direction = shape;
    this.rotates = this.rotatable();
  }

  rotatable() {
    return true;
  }

  getSize() {
    return 3;
  }

  getStartRow() {
    return 1;
  }

  getShape(){
    return this.shape;
  }

  createShape(shape) {
    let shapes = [
      [
        [".", ".", "."],
        ["Z", "Z", "."],
        [".", "Z", "Z"],
      ],
      [
        [".", ".", "Z"],
        [".", "Z", "Z"],
        [".", "Z", "."],
      ],
    ];
    return shapes[shape];
  }
  
  rotateRight() {
    this.rotate()
  }

  rotate() {
    this.direction === 0 ? this.direction = 1 : this.direction = 0;
    return new I_shape(this.direction);
  }

  rotateLeft() {
    this.rotate()
  }

  toString() {
    var output = "";
    this.shape.forEach((elem) => {
      elem.forEach((elemint) => {
        output += elemint;
      });
      output += "\n";
    });
    return output;
  }
}
