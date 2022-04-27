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
  }

  drop(block){
    this.grid[0][this.middle] = block.toString();
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
