import { CellType } from './cellType.enum';
import { MasterViewCellType } from './masterViewCellType.enum';

export type CellStatus = CellType | MasterViewCellType | 'hidden';
