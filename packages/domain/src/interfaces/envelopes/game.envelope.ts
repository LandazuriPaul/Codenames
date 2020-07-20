import { Turn } from '~/enums';
import { PlayingTeam } from '~/types';

import { Board } from '../board.interface';
import { TimerSettings } from '../settings';
import { Cell } from '../cell.interface';

type CellEnvelope = Omit<Cell, 'selectedBy'> & { selectedBy: string[] };

export interface GameEnvelope {
  board: Omit<Board, 'cells'> & { cells: CellEnvelope[] };
  currentTurn: Turn;
  timer: TimerSettings;
  winner?: PlayingTeam;
}
