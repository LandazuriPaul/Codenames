import { UserTeam } from '~/enums';
import { ID, Timestamp } from '~/types';

export interface ChatMessage {
  socketId: ID;
  team: UserTeam;
  text: string;
  timestamp: Timestamp;
  username: string;
}
