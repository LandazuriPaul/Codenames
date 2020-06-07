import { action, observable } from 'mobx';

import {
  ChatEvent,
  GeneralChatEnvelope,
  TeamChatEnvelope,
} from '@codenames/domain';

import { ChatMessage, GeneralChatMessage, TeamChatMessage } from '~/domain';

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

  /*
   * Emitters
   */
  sendMessage(chanel: 'team' | 'general', message: string): void {
    const event =
      chanel === 'team' ? ChatEvent.TeamMessage : ChatEvent.GeneralMessage;
    this.emit(event, { message, roomId: this.rootStore.uiStore.roomId });
  }

  /*
   * Listeners
   */

  @action
  handleMessage(envelope: GeneralChatEnvelope): void {
    const message = this.generateChatMessageFromChatEnvelope(envelope);
    if (envelope.team) {
      this.generalChatMessageList.push(message as GeneralChatMessage);
    } else {
      this.teamChatMessageList.push(message as TeamChatMessage);
    }
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
    if (envelope.username === this.rootStore.uiStore.username) {
      chatMessage.isOwn = true;
    }
  }
}
