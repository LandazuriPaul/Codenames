import { Timestamp } from '~/types';

export interface TeamChatMessage {
  text: string;
  timestamp: Timestamp;
  username: string;
}
