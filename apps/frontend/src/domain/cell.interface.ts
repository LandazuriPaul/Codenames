import { CellType } from './cellType.enum';

export interface Cell {
  index: number;
  type: CellType;
  isRevealed: boolean;
  word: string;
}
