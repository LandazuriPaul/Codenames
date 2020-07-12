import { action, observable } from 'mobx';

import {
  ChatEvent,
  GeneralChatEnvelope,
  TeamChatEnvelope,
  Timestamp,
} from '@codenames/domain';

import { ChatMessage, GeneralChatMessage, TeamChatMessage } from '~/domain';
import { Logger } from '~/utils';

import { RootStore } from './root.store';
import { SocketEmitterStore } from './socketEmitter.store';

export class ChatStore extends SocketEmitterStore {
  @observable
  generalChatMessageList: GeneralChatMessage[];

  @observable
  teamChatMessageList: TeamChatMessage[];

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.generalChatMessageList = [];
    this.teamChatMessageList = [];
  }

  pushInformationMessage(text: string, isForTeam = false): void {
    const message = {
      type: 'information' as 'information',
      message: {
        text,
        timestamp: new Date().getTime() as Timestamp,
      },
    };
    this.pushMessage(message, isForTeam);
  }

  /*
   * Emitters
   */
  sendMessage(message: string, chanel: 'team' | 'general'): void {
    const event =
      chanel === 'team' ? ChatEvent.TeamMessage : ChatEvent.GeneralMessage;
    this.emit(event, message);
  }

  /*
   * Listeners
   */

  handleMessage(envelope: GeneralChatEnvelope): void {
    Logger.log('message received');
    Logger.log(envelope);
    const message = this.generateChatMessageFromChatEnvelope(envelope);
    this.pushMessage(message, !envelope.team);
  }

  /*
   * Helpers
   */

  generateChatMessageFromChatEnvelope(
    envelope: TeamChatEnvelope | GeneralChatEnvelope
  ): ChatMessage {
    const message: ChatMessage = {
      type: 'expression',
      message: envelope,
    };
    this.addOptionalIsOwnToChatMessage(envelope, message);
    return message;
  }

  addOptionalIsOwnToChatMessage(
    envelope: GeneralChatEnvelope | TeamChatEnvelope,
    chatMessage: ChatMessage
  ): void {
    if (envelope.username === this.rootStore.roomStore.username) {
      chatMessage.isOwn = true;
    }
  }

  @action
  private pushMessage(
    message: GeneralChatMessage | TeamChatMessage,
    isForTeam: boolean
  ): void {
    if (isForTeam) {
      this.teamChatMessageList.push(message as TeamChatMessage);
    } else {
      this.generalChatMessageList.push(message as GeneralChatMessage);
    }
  }
}
