import { AvailableLanguages } from '~/enums';

import { BoardSettings } from './boardSettings.interface';
import { TeamSettings } from './teamSettings.interface';
import { TimerSettings } from './timerSettings.interface';

export interface GameSettings {
  board: BoardSettings;
  language: AvailableLanguages;
  rudeRatio: number;
  teams: TeamSettings;
  timer: TimerSettings;
}
