import { Timestamp } from '~/types';

export interface TeamChatEnvelope {
  text: string;
  timestamp: Timestamp;
  username: string;
}
