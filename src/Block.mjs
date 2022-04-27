import { RotatingShape } from "../src/RotatingShape.mjs";

export class Block {
  color;

  constructor(symbol) {
    return new RotatingShape(symbol);
  }

}
