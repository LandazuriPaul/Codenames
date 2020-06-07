import { Timestamp } from '@codenames/domain';

export interface BaseMessage {
  text: string;
  timestamp: Timestamp;
}
