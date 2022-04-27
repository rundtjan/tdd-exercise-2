export class RotatingShape {
  color;

  constructor(shape) {
    if (Array.isArray(shape)) this.shape = shape;
    else this.shape = this.createShape(shape);
    this.rotates = this.rotatable();
    this.number = 9999999;
  }

  rotatable() {
    let check = (this.shape[0].includes("O") || this.shape.length === 1)
    return !check
  }

  setNumber(number) {
    this.number = number
  }

  getNumber() {
    return this.number
  }

  createShape(string) {
    let shape = string.replace(/\s/g, "");
    let width = Math.sqrt(shape.length)
    let grid = Array(width)
      .fill()
      .map(() => Array(width));
    let z = 0;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        grid[i][j] = shape[z];
        z++;
      }
    }
    return grid;
  }

  rotateRight() {
    if (this.rotates)
      return new RotatingShape(
        this.centering(
          this.shape.map((_, colIndex) =>
            this.shape
              .slice()
              .reverse()
              .map((row) => {
                return row[colIndex];
              })
          )
        )
      );
    else return this;
  }

  rotateLeft() {
    if (this.rotates)
      return new RotatingShape(
        this.centering(
          this.shape.map((_, colIndex) =>
            this.shape.map((row) => {
              return row[this.shape.length - 1 - colIndex];
            })
          )
        )
      );
    else return this;
  }

  centering(shape) {
    if (
      !shape[0].map((elem) => elem === ".").includes(false) &&
      shape[shape.length - 1].map((elem) => elem === ".").includes(false) &&
      !shape.map((elem) => elem[0] === ".").includes(false) &&
      !shape.map((elem) => elem[shape.length - 1] === ".").includes(false)
    ) {
      shape.shift();
      shape.push(shape[0].map(() => "."));
      return shape;
    } else if (
      !shape.map((elem) => elem[0] === ".").includes(false) &&
      shape.map((elem) => elem[shape.length - 1] === ".").includes(false) &&
      !shape[0].map((elem) => elem === ".").includes(false) &&
      !shape[shape.length - 1].map((elem) => elem === ".").includes(false)
    ) {
      return shape.map((elem) => {
        elem.shift();
        elem.push(".");
        return elem;
      });
    } else {
      return shape;
    }
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
