import { Turn } from '~/enums';

import { Board } from './board.interface';
import { TimerSettings } from './settings';

export interface Game {
  board: Board;
  currentTurn: Turn;
  timer: TimerSettings;
}
