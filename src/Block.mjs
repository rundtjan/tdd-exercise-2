import { Block_shape } from "../src/tetrominoes/Block_shape.mjs"

export class Block {
  color;

  constructor(symbol) {
    return new Block_shape(symbol);
  }

}
