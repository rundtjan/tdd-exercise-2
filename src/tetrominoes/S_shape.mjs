export class S_shape {

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
        [".", "S", "S"],
        ["S", "S", "."],
      ],
      [
        ["S", ".", "."],
        ["S", "S", "."],
        [".", "S", "."],
      ],
    ];
    return shapes[shape];
  }
  
  rotateRight() {
    this.rotate()
  }

  rotate() {
    if (this.direction === 0) return new S_shape(1);
    return new S_shape(0);
  }

  rotateLeft() {
    this.rotate()
  }

  whoAmI(){
    return "S_SHAPE";
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
