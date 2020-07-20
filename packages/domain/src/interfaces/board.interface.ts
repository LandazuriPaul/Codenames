import { PlayingTeam } from '~/types';

import { Cell } from './cell.interface';

export interface Board {
  height: number;
  width: number;
  cells: Cell[];
  remaining: Record<PlayingTeam, number>;
}
