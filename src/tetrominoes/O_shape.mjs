export class O_shape {

  constructor(shape = 0) {
    this.shape = this.createShape();
    this.direction = shape;
    this.rotates = this.rotatable();
  }

  rotatable() {
    return false;
  }

  getSize() {
    return 2;
  }

  getStartRow() {
    return 0;
  }

  getShape(){
    return this.shape;
  }

  createShape() {
    let shapes = [
      [
        ["O", "O"],
        ["O", "O"],
      ],
    ];
    return shapes[0];
  }
  
  rotateRight() {
    return this;
  }

  rotateLeft() {
    return this;
  }

  whoAmI(){
    return "O_SHAPE";
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
