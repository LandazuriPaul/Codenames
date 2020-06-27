import { Team } from '@codenames/domain';

export interface SocketRoomIdentifier {
  roomId: string;
  team?: Team;
  username?: string;
}
