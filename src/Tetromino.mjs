import { RotatingShape } from "../src/RotatingShape.mjs";
import { T_shape } from '../src/tetrominoes/T_shape.mjs';
import { Z_shape } from '../src/tetrominoes/Z_shape.mjs';
import { L_shape } from '../src/tetrominoes/L_shape.mjs';
import { I_shape } from '../src/tetrominoes/I_shape.mjs';
import { O_shape } from '../src/tetrominoes/O_shape.mjs';
import { S_shape } from '../src/tetrominoes/S_shape.mjs';
import { J_shape } from '../src/tetrominoes/J_shape.mjs';

export class Tetromino {

  static T_SHAPE = new T_shape(0);

  static Z_SHAPE = new Z_shape(0);

  static L_SHAPE = new L_shape(0);

  static I_SHAPE = new I_shape(0);

  static O_SHAPE = new O_shape(0);

  static S_SHAPE = new S_shape(0);

  static J_SHAPE = new J_shape(0);

  static choose(index){
    return [Tetromino.I_SHAPE, Tetromino.J_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE, Tetromino.S_SHAPE, Tetromino.T_SHAPE, Tetromino.Z_SHAPE][index];
  }

}