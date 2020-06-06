import { action, observable } from 'mobx';

import {
  ChatEvent,
  GlobalChatMessage,
  Team,
  TeamChatMessage,
} from '@codenames/domain';

import { Logger } from '~/utils';

import { RootStore } from './root.store';
import { SocketEmitterStore } from './socketEmitter.store';

export class ChatStore extends SocketEmitterStore {
  @observable
  globalMessageList: GlobalChatMessage[];

  @observable
  teamMessageList: TeamChatMessage[];

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.globalMessageList = [];
    this.teamMessageList = [];
    // this.globalMessageList = fakeGlobalMessageList;
    // this.teamMessageList = fakeTeamMessageList;
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
const fakeGlobalMessageList: GlobalChatMessage[] = [
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: Team.B,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: Team.A,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: Team.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: Team.A,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: Team.B,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: Team.A,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: Team.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: Team.A,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: Team.B,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: Team.A,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: Team.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: Team.A,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: Team.B,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: Team.A,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: Team.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: Team.A,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: Team.B,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: Team.A,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: Team.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: Team.A,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: Team.B,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: Team.A,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: Team.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: Team.A,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: Team.B,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: Team.A,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: Team.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: Team.A,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: Team.B,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: Team.A,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: Team.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: Team.A,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: Team.B,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: Team.A,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: Team.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: Team.A,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
];

const fakeTeamMessageList: TeamChatMessage[] = [
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
];
