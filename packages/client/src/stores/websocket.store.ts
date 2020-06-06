import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import io from 'socket.io-client';

import {
  ChatEvent,
  RoomEvent,
  SocketEvent,
  SocketNamespace,
} from '@codenames/domain';

import { Logger, getNamespaceSocketUrl } from '~/utils';

import { RootStore } from './root.store';
import { ChildStore } from './child.store';

export class WebsocketStore extends ChildStore {
  static LOCALSTORAGE_KEY = 'ws';

  @persist
  @observable
  token: string;

  private sockets: Record<SocketNamespace, SocketIOClient.Socket>;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.sockets = {
      [SocketNamespace.Chat]: undefined,
      [SocketNamespace.Default]: undefined,
      [SocketNamespace.Game]: undefined,
      [SocketNamespace.Room]: undefined,
    };
    this.token = undefined;
  }

  connect(): void {
    const connectionOptions = {
      query: { token: this.token },
    };
    this.sockets[SocketNamespace.Default] = io(
      getNamespaceSocketUrl(SocketNamespace.Default),
      connectionOptions
    );
    this.sockets[SocketNamespace.Room] = io(
      getNamespaceSocketUrl(SocketNamespace.Room),
      connectionOptions
    );
    this.sockets[SocketNamespace.Chat] = io(
      getNamespaceSocketUrl(SocketNamespace.Chat),
      connectionOptions
    );
    this.sockets[SocketNamespace.Game] = io(
      getNamespaceSocketUrl(SocketNamespace.Game),
      connectionOptions
    );
    this.attachSocketListeners();
  }

  attachSocketListeners(): void {
    // Default
    this.sockets[SocketNamespace.Default]
      .on(SocketEvent.Connect, this.handleConnect.bind(this))
      .on(SocketEvent.ConnectError, this.handleConnectError.bind(this))
      .on(SocketEvent.Exception, this.handleException.bind(this))
      .on(SocketEvent.Disconnect, this.handleDisconnect.bind(this));

    // Room
    const { uiStore } = this.rootStore;
    this.sockets[SocketNamespace.Room]
      .on(RoomEvent.RoomJoined, uiStore.roomJoined.bind(uiStore))
      .on(RoomEvent.RoomLeft, uiStore.roomLeft.bind(uiStore))
      .on(RoomEvent.UserJoined, uiStore.userJoined.bind(uiStore));

    // Chat
    const { chatStore } = this.rootStore;
    this.sockets[SocketNamespace.Chat].on(
      ChatEvent.Message,
      chatStore.handleMessage.bind(chatStore)
    );

    // TODO: gamestore
  }

  /*
   * Getters / setters
   */

  @action
  setToken(token: string): void {
    this.token = token;
  }

  getSocket(namespace: SocketNamespace): SocketIOClient.Socket {
    return this.sockets[namespace];
  }

  /*
   * Emitters
   */

  @action
  disconnect(): void {
    // TODO: send disconnect message? Remove token?
  }

  /*
   * Listeners
   */

  @action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleConnectError(err: any): void {
    Logger.error(err);
    this.token = undefined;
    // TODO: retry with new token
  }

  @action
  handleConnect(): void {
    Logger.log('ws: connection established');
  }

  @action
  handleDisconnect(): void {
    Logger.log('ws: disconnected');
  }

  @action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleException(exception: any): void {
    Logger.warn('A WS exception occurred');
    Logger.warn(exception);
  }
}
