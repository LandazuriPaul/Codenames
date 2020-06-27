import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { RoomEvent, RoomJoinedEnvelope } from '@codenames/domain';

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

  @observable
  userList: string[];

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.roomId = undefined;
    this.username = undefined;
    this.userList = [];
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
  roomJoined({ roomId, usernames }: RoomJoinedEnvelope): void {
    this.roomId = roomId;
    Logger.log(`room ${this.roomId} joined`);
    this.userList = usernames;
    Logger.log(`users already here: ${this.userList.join(', ')}`);
  }

  @action
  userJoined(newUsername: string): void {
    if (!this.userList.includes(newUsername)) {
      this.userList.push(newUsername);
      Logger.log(`new user joined: ${newUsername}`);
    }
  }

  userLeft(leftUsername: string): void {
    Logger.log(`${leftUsername} left the game`);
  }
}
