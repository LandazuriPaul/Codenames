import { CellType } from '~/enums';

export interface Cell {
  index: number;
  type: CellType;
  isRevealed: boolean;
  word: string;
}
