import { UserTeam } from '~/enums';
import { ID, Timestamp } from '~/types';

export interface ChatMessage {
  isSpyMaster?: boolean;
  socketId: ID;
  team: UserTeam;
  text: string;
  timestamp: Timestamp;
  username: string;
}
