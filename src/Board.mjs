export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array(height);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(width);
      for (var j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = ".";
      }
    }
    this.middle = (width % 2 === 0 ? width / 2 - 1 : Math.floor(width / 2));
    this.falling = false;
    this.fallingBlock = 0;
  }

  drop(block) {
    if (this.falling) throw "already falling";
    else block.setNumber(this.fallingBlock);
    console.log('middle ', this.middle)
    this.grid[0][this.middle] = block;
    this.falling = true;
  }

  hasFalling() {
    return this.falling;
  }

  tick() {
    for (var i = this.height - 1; i >= 0; i--) {
      for (var j = 0; j < this.width; j++) {
        if (this.grid[i][j] != ".") {
          if (this.grid[i][j].getNumber() === this.fallingBlock) {
            if (i === this.height - 1) {
              this.fallingBlock++;
              this.falling = false;
            } else if (i < this.height - 1 && this.grid[i + 1][j] === ".") {
              this.grid[i + 1][j] = this.grid[i][j];
              this.grid[i][j] = ".";
            } else {
              this.fallingBlock++;
              this.falling = false;
            }
          }
        }
      }
    }
  }

  toString() {
    var output = "";
    this.grid.forEach((elem) => {
      elem.forEach((elemint) => {
        if (elemint === ".") output += elemint;
        else output += elemint.toString();
      });
      output += "\n";
    });
    return output;
  }
}
