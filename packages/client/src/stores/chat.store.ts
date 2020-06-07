import { action, observable } from 'mobx';

import {
  ChatEvent,
  GeneralChatEnvelope,
  Team,
  TeamChatEnvelope,
  Timestamp,
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
    // this.globalMessageList = [];
    // this.teamMessageList = [];
    this.generalChatMessageList = fakeGeneralMessageList;
    this.teamChatMessageList = fakeTeamMessageList;
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

// FIXME
const fakeGeneralMessageList: GeneralChatMessage[] = [
  {
    type: 'expression',
    message: {
      team: Team.B,
      text: 'Heeeey !',
      timestamp: 1589867860806 as Timestamp,
      username: 'Marcel',
    },
  },
  {
    type: 'information',
    message: {
      text: 'Bibi est arrivé !',
      timestamp: 1589867871473 as Timestamp,
    },
  },
  {
    type: 'expression',
    message: {
      text: 'Je regarde comment vous jouez bande de nuls !',
      timestamp: 1589867900032 as Timestamp,
    },
  },
  {
    type: 'expression',
    isOwn: true,
    message: {
      team: Team.A,
      text: 'Moi je peux pas voir votre petite convers',
      timestamp: 1589867874019 as Timestamp,
      username: 'Robert',
    },
  },
];

const fakeTeamMessageList: TeamChatMessage[] = [
  {
    type: 'expression',
    message: {
      text: 'Message privé !',
      timestamp: 1589867860806 as Timestamp,
      username: 'Marcel',
    },
  },

  {
    type: 'information',
    message: {
      text: 'Bibi est arrivé !',
      timestamp: 1589867871473 as Timestamp,
    },
  },
];
