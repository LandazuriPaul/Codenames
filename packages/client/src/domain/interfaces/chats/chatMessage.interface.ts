import { BaseMessage } from '../messages/baseMessage.interface';
import { TeamMessage } from '../messages/teamMessage.interface';
import { GeneralMessage } from '../messages/generalMessage.interface';

export interface ChatMessage {
  type: 'information' | 'expression';
  isOwn?: true;
  message: BaseMessage | TeamMessage | GeneralMessage;
}
