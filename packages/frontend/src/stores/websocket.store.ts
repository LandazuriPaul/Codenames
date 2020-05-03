import { action, computed } from 'mobx';
import io from 'socket.io-client';

import { SocketEvent } from '@codenames/domain';

import { API_URL } from '~/config';
import { Logger } from '~/utils';

import { RootStore } from './root.store';
import { ChildStore } from './child.store';

export class WebsocketStore extends ChildStore {
  private socket: SocketIOClient.Socket;

  constructor(rootStore: RootStore) {
    super(rootStore);

    this.socket = io(API_URL);
    this.socket.on(SocketEvent.CONNECT, this.handleConnect.bind(this));
    this.socket.on(SocketEvent.EVENT, this.handleEvent.bind(this));
    this.socket.on(SocketEvent.EXCEPTION, this.handleException.bind(this));
    this.socket.on(SocketEvent.DISCONNECT, this.handleDisconnect.bind(this));
  }

  @computed
  get isConnected(): boolean {
    return this.socket.connected;
  }

  @action
  handleConnect(): void {
    Logger.log('handleConnect');
    setTimeout(() => {
      this.socket.emit('chat', 'un premier message');
    }, 1000);
  }

  @action
  handleDisconnect(): void {
    Logger.log('Disconnected');
  }

  @action
  handleEvent(data): void {
    Logger.log(data);
  }

  @action
  handleException(exception): void {
    Logger.warn(exception);
  }
}
