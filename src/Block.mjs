export class Block {
  color;

  constructor(symbol) {
    this.symbol = symbol;
    this.number = 99999
    this.falling = false
  }

  setNumber(number){
    this.number = number
  }

  getNumber(){
    return this.number
  }

  setFalling(falling){
    this.falling = falling
  }

  isFalling(){
    return this.falling
  }

  toString(){
    return this.symbol
  }
}
