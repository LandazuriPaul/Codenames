import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { RoomEvent, RoomJoinedMessage } from '@codenames/domain';

import { Logger } from '~/utils';

import { RootStore } from './root.store';
import { SocketEmitterStore } from './socketEmitter.store';

export class UiStore extends SocketEmitterStore {
  static LOCALSTORAGE_KEY = 'ui';

  @persist
  @observable
  roomId: string;

  @persist
  @observable
  username: string;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.roomId = undefined;
    this.username = undefined;
  }

  /*
   * Getters / setters
   */

  @action
  setUsername(username: string): void {
    this.username = username;
  }

  /*
   * Emitters
   */

  joinRoom(roomId: string): void {
    this.rootStore.websocketStore.connect();
    Logger.log(`joining room ${roomId} as ${this.username}`);
    this.emit(RoomEvent.JoinRoom, {
      roomId,
      username: this.username,
    });
  }

  leaveRoom(): void {
    this.emit(RoomEvent.LeaveRoom, this.roomId);
  }

  /*
   * Listeners
   */

  @action
  roomJoined(roomId: string): void {
    this.roomId = roomId;
    Logger.log(`room ${this.roomId} joined`);
  }

  @action
  roomLeft(roomId: string): void {
    Logger.log(`room ${roomId} left`);
    this.roomId = undefined;
  }

  @action
  userJoined(newUsername: string): void {
    Logger.log(`new user joined: ${newUsername}`);
  }

  userList(roomSize: number): void {
    Logger.log(`room size: ${roomSize}`);
  }
}
