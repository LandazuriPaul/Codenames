import { Teams } from '../teams.interface';

import { GameEnvelope } from './game.envelope';

export interface GameReadyEnvelope {
  game: GameEnvelope;
  teams: Teams;
}
