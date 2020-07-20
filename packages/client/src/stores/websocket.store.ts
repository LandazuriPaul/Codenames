import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import io from 'socket.io-client';

import {
  ChatEvent,
  GameEvent,
  RoomEvent,
  SocketEvent,
} from '@codenames/domain';

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
    Logger.log('ws: init connection');
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
    const { chatStore, gameStore, roomStore } = this.rootStore;
    this._socket
      // Default
      .on(SocketEvent.Connect, this.handleConnect.bind(this))
      .on(SocketEvent.ConnectError, this.handleConnectError.bind(this))
      .on(SocketEvent.Error, this.handleError.bind(this))
      .on(SocketEvent.Exception, this.handleException.bind(this))
      .on(SocketEvent.Disconnect, this.handleDisconnect.bind(this))

      // UiStore
      .on(RoomEvent.RoomJoined, roomStore.roomJoined.bind(roomStore))
      .on(RoomEvent.RoomLeft, roomStore.roomLeft.bind(roomStore))
      .on(RoomEvent.UserJoined, roomStore.userJoined.bind(roomStore))
      .on(RoomEvent.UserLeft, roomStore.userLeft.bind(roomStore))

      // Chat
      .on(ChatEvent.GeneralMessage, chatStore.handleMessage.bind(chatStore))
      .on(ChatEvent.TeamMessage, chatStore.handleMessage.bind(chatStore))

      // Game
      .on(GameEvent.GameReady, gameStore.handleGameReady.bind(gameStore))
      .on(GameEvent.GameWon, gameStore.handleGameWon.bind(gameStore))
      .on(GameEvent.CellRevealed, gameStore.handleCellRevealed.bind(gameStore))
      .on(GameEvent.CellSelected, gameStore.handleCellSelected.bind(gameStore));
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
    this._socket.disconnect();
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
    // FIXME: on invalid token, return to home?
    Logger.log('ws: connection error');
    Logger.error(err);
    // If after a number of retries it doesn't work
    // we should let know the user and eventually delete the token
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
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleException(exception: any): void {
    Logger.log('A WS exception occurred');
    Logger.warn(exception);
  }
}
