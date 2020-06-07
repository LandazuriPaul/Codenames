import { BaseMessage } from '../messages/baseMessage.interface';
import { GeneralMessage } from '../messages/generalMessage.interface';

export interface GeneralChatMessage {
  type: 'information' | 'expression';
  isOwn?: true;
  message: BaseMessage | GeneralMessage;
}
