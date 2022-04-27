export class RotatingShape {
  color;

  constructor(shape) {
    if (Array.isArray(shape)) this.shape = shape
    else this.shape = this.createShape(shape);
  }

  createShape(string){
    let shape = string.replace(/\s/g, '')
    let width;
    shape.length == 9 ? width = 3 : width = 5; 
    /*let arr = string.split('\n')
    arr.forEach((element, index) => {
      arr[index] = element.replace(/\s/g, "")
    });
    let width = arr[0].length;*/
    let grid = new Array(width);
    let z = 0
    for (var i = 0; i < width; i++){
      grid[i] = new Array(width);
      for (var j = 0; j < width; j++){
        grid[i][j] = shape[z];
        z++;
      }
    }
    return grid
  }

  rotateRight(){
    let tmp = [];
    this.shape.forEach(elem => tmp.push(new Array(this.shape.length)))
    this.shape.forEach((element, index) => {
      element.forEach((elem, ind) =>{
        tmp[ind][tmp.length-1-index] = elem
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