export class T_shape {
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

  getShape() {
    return this.shape;
  }

  createShape(shape) {
    let shapes = [
      [
        [".", ".", "."],
        ["T", "T", "T"],
        [".", "T", "."],
      ],
      [
        [".", "T", "."],
        ["T", "T", "."],
        [".", "T", "."],
      ],
      [
        [".", ".", "."],
        [".", "T", "."],
        ["T", "T", "T"],
      ],
      [
        [".", "T", "."],
        [".", "T", "T"],
        [".", "T", "."],
      ],
    ];
    return shapes[shape];
  }

  rotateRight() {
    if (this.direction === 3) return new T_shape(0);
    return new T_shape(this.direction + 1);
  }

  rotateLeft() {
    if (this.direction === 0) return new T_shape(3);
    return new T_shape(this.direction - 1);
  }

  toString() {
    if (this.shape.length === 1) return this.shape[0][0];
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
