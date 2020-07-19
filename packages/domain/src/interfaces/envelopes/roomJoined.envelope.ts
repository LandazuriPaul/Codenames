import { GameReadyEnvelope } from './gameReady.envelope';

export interface RoomJoinedEnvelope extends Partial<GameReadyEnvelope> {
  isHost: boolean;
  roomId: string;
  usernames: string[];
}
