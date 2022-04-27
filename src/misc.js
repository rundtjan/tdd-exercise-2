shape = [['.', '.', '.'],['.', 'I', '.'], ['.', 'I', '.']]

if (!shape[0].map(elem => elem === '.' ? true : false).includes(false)){
  shape.shift()
  //shape.push([shape[0].map(() => '.')])
  shape.push(shape.shift())
} //console.log(shape.shift().push(shape[0].map(() => '.')))

console.log(shape)
