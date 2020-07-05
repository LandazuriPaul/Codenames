import { Teams } from '../teams.interface';
import { Game } from '../game.interface';

export interface RoomJoinedEnvelope {
  game?: Game;
  isHost: boolean;
  roomId: string;
  teams: Teams;
  usernames: string[];
}
