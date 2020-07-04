import { Cell } from '../cell.interface';

export interface NewGameEnvelope {
  board: Cell[];
  boardHeight: number;
  boardWidth: number;
}
