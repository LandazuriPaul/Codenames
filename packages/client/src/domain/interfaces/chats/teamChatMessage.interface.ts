import { BaseMessage } from '../messages/baseMessage.interface';
import { TeamMessage } from '../messages/teamMessage.interface';

export interface TeamChatMessage {
  type: 'information' | 'expression';
  isOwn?: true;
  message: BaseMessage | TeamMessage;
}
