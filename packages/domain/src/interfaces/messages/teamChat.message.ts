import { ID, Timestamp } from '~/types';

export interface TeamChatMessage {
  socketId: ID;
  text: string;
  timestamp: Timestamp;
  username: string;
}
