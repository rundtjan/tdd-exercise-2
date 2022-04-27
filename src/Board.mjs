export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array(height);
    for (var i = 0; i < this.grid.length; i++){
      this.grid[i] = new Array(width)
      for (var j = 0; j < this.grid[i].length; j++){
        this.grid[i][j] = '.'
      }
    }
    this.middle = Math.floor(width / 2);
    this.falling = false
    this.fallingBlock = 0
  }

  drop(block){
    if (this.falling) throw 'already falling';
    else block.setNumber(this.fallingBlock); this.grid[0][this.middle] = block; this.falling = true;
  }

  hasFalling(){
    return this.falling
  }

  tick(){
    for (var i = this.height-1; i >= 0; i--){
      for (var j = 0; j < this.width; j++){
        if (i == this.height-1) {
          if (this.grid[i][j] == '.'){
            this.grid[i][j] = this.grid[i-1][j]
          } else {
            if (this.grid[i][j].getNumber() == this.fallingBlock) {
              this.fallingBlock++;
              this.falling = false;
            }
          }
        }
        else if (i > 0 && i < this.height-1) this.grid[i][j] = this.grid[i-1][j]
        else this.grid[i][j] = '.'
      }
    }
  }

  toString() {
    var output = ''
    this.grid.forEach(elem => {
      elem.forEach(elemint => {
        if (elemint === '.') output+=elemint;
        else output+=elemint.toString()
      });
      output+= '\n'
    })
    console.log(output)
    console.log(this.falling)
    return output
  }
}
