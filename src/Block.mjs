export class Block {
  color;

  constructor(symbol) {
    this.symbol = symbol;
    this.falling = false
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
