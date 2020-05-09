import { action } from 'mobx';
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

  @action
  handleConnect(): void {
    Logger.log('ws: connected as user');
  }

  @action
  handleDisconnect(): void {
    Logger.log('ws: disconnected');
  }

  @action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleEvent(data: any): void {
    Logger.log('ws: generic event');
    Logger.log(data);
  }

  @action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleException(exception: any): void {
    Logger.warn(exception);
  }
}
