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

  getShape(){
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
    if (this.rotatable()) {
      this.direction++;
      if (this.direction > 3) this.direction = 0;
      return new T_shape(this.direction);
    } else return this;
  }

  rotateLeft() {
    if (this.rotatable()) {
      this.direction--;
      if (this.direction < 0) this.direction = 3;
      return new T_shape(this.direction);
    } else return this;
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
