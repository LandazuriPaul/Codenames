import { ChatEvent, SocketNamespace } from '@codenames/domain';

import { Logger, getNamespaceSocketUrl } from '~/utils';

import { RootStore } from './root.store';
import { ChildStore } from './child.store';

export class ChatStore extends ChildStore {
  private socket: SocketIOClient.Socket;

  constructor(rootStore: RootStore) {
    super(rootStore);
  }

  connect(): void {
    this.socket = io(getNamespaceSocketUrl(SocketNamespace.Chat));
    this.socket.on(ChatEvent.MESSAGE, this.handleMessage.bind(this));
    this.socket.on(ChatEvent.USER_LIST, this.handleUserList.bind(this));
  }

  handleMessage(): void {
    Logger.log('handleMessage');
  }

  handleUserList(): void {
    Logger.log('handleUserList');
  }
}
