export class J_shape {

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
        ["J", "J", "J"],
        [".", ".", "J"],
      ],
      [
        [".", "J", "."],
        [".", "J", "."],
        ["J", "J", "."],
      ],
      [
        [".", ".", "."],
        ["J", ".", "."],
        ["J", "J", "J"],
      ],
      [
        [".", "J", "J"],
        [".", "J", "."],
        [".", "J", "."],
      ],
    ];
    return shapes[shape];
  }
  
  rotateRight() {
    if (this.direction === 3) return new J_shape(0);
    return new J_shape(this.direction + 1);
  }

  rotateLeft() {
    if (this.direction === 0) return new J_shape(3);
    return new J_shape(this.direction - 1);
  }

  whoAmI(){
    return "J_SHAPE";
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
