import { action, observable } from 'mobx';

import { ChatEvent, Team, Timestamp } from '@codenames/domain';

import { GeneralChatMessage, TeamChatMessage } from '~/domain';
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
    // this.globalMessageList = [];
    // this.teamMessageList = [];
    this.generalChatMessageList = fakeGeneralMessageList;
    this.teamChatMessageList = fakeTeamMessageList;
  }

  /*
   * Emitters
   */
  sendMessage(message: string): void {
    this.emit(ChatEvent.Message, message);
  }

  /*
   * Listeners
   */

  handleMessage(message: string): void {
    Logger.log(`new message: ${message}`);
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
