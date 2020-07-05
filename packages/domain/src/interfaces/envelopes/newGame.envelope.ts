import { Board } from '../board.interface';
import { Teams } from '../teams.interface';
import { TimerSettings } from '../settings';

export interface NewGameEnvelope {
  board: Board;
  timer: TimerSettings;
  teams: Teams;
}
