import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import io from 'socket.io-client';

import { ChatEvent, RoomEvent, SocketEvent } from '@codenames/domain';

import { Logger } from '~/utils';

import { RootStore } from './root.store';
import { ChildStore } from './child.store';
import { API_URL } from '~/config';

export class WebsocketStore extends ChildStore {
  static LOCALSTORAGE_KEY = 'ws';

  @persist
  @observable
  token: string;

  _socket: SocketIOClient.Socket;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this._socket = undefined;
    this.token = undefined;
  }

  connect(): void {
    this._socket = io(API_URL, {
      query: { token: this.token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });
    this.attachSocketListeners();
  }

  attachSocketListeners(): void {
    const { chatStore, uiStore } = this.rootStore;
    this._socket
      // Default
      .on(SocketEvent.Connect, this.handleConnect.bind(this))
      .on(SocketEvent.ConnectError, this.handleConnectError.bind(this))
      .on(SocketEvent.Error, this.handleError.bind(this))
      .on(SocketEvent.Exception, this.handleException.bind(this))
      .on(SocketEvent.Disconnect, this.handleDisconnect.bind(this))

      // UiStore
      .on(RoomEvent.RoomJoined, uiStore.roomJoined.bind(uiStore))
      .on(RoomEvent.RoomLeft, uiStore.roomLeft.bind(uiStore))
      .on(RoomEvent.UserJoined, uiStore.userJoined.bind(uiStore))
      .on(RoomEvent.UserLeft, uiStore.userLeft.bind(uiStore))

      // Chat
      .on(ChatEvent.GeneralMessage, chatStore.handleMessage.bind(chatStore))
      .on(ChatEvent.TeamMessage, chatStore.handleMessage.bind(chatStore));

    // TODO: gamestore
  }

  /*
   * Getters / setters
   */

  @action
  setToken(token: string): void {
    this.token = token;
  }

  get socket(): SocketIOClient.Socket {
    return this._socket;
  }

  /*
   * Emitters
   */

  disconnect(): void {
    this.init();
  }

  /*
   * Listeners
   */

  handleConnect(): void {
    Logger.log('ws: connection established');
  }

  @action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleConnectError(err: any): void {
    Logger.log('ws: connection error');
    Logger.error(err);
    this.token = undefined;
    // TODO: retry with new token
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(err: any): void {
    Logger.log('ws: error');
    Logger.error(err);
  }

  @action
  handleDisconnect(): void {
    Logger.log('ws: disconnected');
    setTimeout(this.connect.bind(this), 500);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleException(exception: any): void {
    Logger.log('A WS exception occurred');
    Logger.warn(exception);
  }
}
