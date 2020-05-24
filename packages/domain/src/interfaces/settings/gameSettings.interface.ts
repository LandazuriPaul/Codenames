import { BoardSettings } from './boardSettings.interface';
import { TeamSettings } from './teamSettings.interface';
import { TimerSettings } from './timerSettings.interface';

export interface GameSettings {
  board: BoardSettings;
  teams: TeamSettings;
  timer: TimerSettings;
}
