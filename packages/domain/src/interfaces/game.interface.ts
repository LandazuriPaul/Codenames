import { Board } from './board.interface';
import { TimerSettings } from './settings';

export interface Game {
  board: Board;
  timer: TimerSettings;
}
