array = [['A','B','C'], ['D','E','F'], ['G','H','I']]
output = array.map((_, colIndex) => array.reverse().map(row => {console.log(row); return row[colIndex]}));
console.log(output)

//      `GDA
//        HEB
//        IFC`