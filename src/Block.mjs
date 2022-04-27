export class Block {
  color;

  constructor(symbol) {
    this.symbol = symbol;
    this.number = 999999
  }

  setNumber(number){
    this.number = number
  }

  getNumber(){
    return this.number
  }

  toString(){
    return this.symbol
  }
}
