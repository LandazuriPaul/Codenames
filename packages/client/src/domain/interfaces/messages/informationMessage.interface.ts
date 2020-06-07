import { BaseMessage } from './baseMessage.interface';

export interface InformationMessage extends BaseMessage {
  isInformation: true;
}
