export class RotatingShape {
  color;

  constructor(shape) {
    if (Array.isArray(shape)) this.shape = shape
    else this.shape = this.createShape(shape);
  }

  createShape(string){
    let shape = string.replace(/\s/g, '')
    let width = (shape.length == 9 ? 3 : 5)
    let grid = Array(width).fill().map(() => Array(width));
    let z = 0;
    for (let i = 0; i < width; i++){
      for (let j = 0; j < width; j++){
        grid[i][j] = shape[z];
        z++;
      }
    }
    return grid
  }

  rotateRight(){
    return new RotatingShape(this.shape.map((_, colIndex) => this.shape.slice().reverse().map(row => {return row[colIndex]})));
  }

  rotateLeft(){
    return new RotatingShape(this.shape.map((_, colIndex) => this.shape.map(row => {return row[this.shape.length-1-colIndex]})))
    let tmp = [];
    this.shape.forEach(() => tmp.push(new Array(this.shape.length)))
    this.shape.forEach((element, index) => {
      element.forEach((elem, ind) =>{
        tmp[tmp.length-1-ind][index] = elem
      })
    })
    return new RotatingShape(tmp);
  }

  toString(){
    var output = ''
    this.shape.forEach(elem => {
      elem.forEach(elemint => {
        output+=elemint
      });
      output+= '\n'
    })
    return output
  }
}