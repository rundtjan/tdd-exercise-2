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
  }

  drop(block){
    if (this.falling) throw 'already falling';
    else this.grid[0][this.middle] = block.toString(); this.falling = true;
  }

  tick(){
    for (var i = this.height-1; i >= 0; i--){
      for (var j = 0; j < this.width; j++){
        if (i > 0) this.grid[i][j] = this.grid[i-1][j]
        else this.grid[i][j] = '.'
      }
    }

  }

  toString() {
    var output = ''
    this.grid.forEach(elem => {
      elem.forEach(elemint => output+=elemint);
      output+= '\n'
    })
    return output
    return "...\n...\n...\n";
  }
}
