import { Board } from '../board.interface';
import { Teams } from '../teams.interface';
import { TimerSettings } from '../settings';

export interface GameEnvelope {
  board: Board;
  timer: TimerSettings;
  teams: Teams;
}
