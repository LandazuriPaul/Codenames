import { GameReadyEnvelope } from './gameReady.envelope';

export interface RoomJoinedEnvelope extends GameReadyEnvelope {
  isHost: boolean;
  roomId: string;
  usernames: string[];
}
