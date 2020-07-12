import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { RoomEvent, RoomJoinedEnvelope } from '@codenames/domain';

import { Logger } from '~/utils';

import { RootStore } from './root.store';
import { SocketEmitterStore } from './socketEmitter.store';

export class RoomStore extends SocketEmitterStore {
  static LOCALSTORAGE_KEY = 'room';

  @persist
  @observable
  isHost: boolean;

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
    this.username = undefined;
    this.reset();
  }

  @action
  reset(): void {
    this.isHost = false;
    this.roomId = undefined;
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
    this.emit(RoomEvent.LeaveRoom);
  }

  /*
   * Listeners
   */

  @action
  roomJoined({
    game,
    isHost,
    roomId,
    teams,
    usernames,
  }: RoomJoinedEnvelope): void {
    this.isHost = isHost;
    this.roomId = roomId;
    Logger.log(`room ${this.roomId} joined`);
    this.userList = usernames;
    Logger.log(`users already here: ${this.userList.join(', ')}`);
    this.rootStore.gameStore.setUserRoleInGame(teams);
    if (game) {
      this.rootStore.gameStore.setBoard(game.board);
      this.rootStore.gameStore.setCurrentTurn(game.currentTurn);
    }
  }

  @action
  roomLeft(): void {
    Logger.log(`room ${this.roomId} left`);
    this.reset();
    this.rootStore.websocketStore.disconnect();
    location.href = '/';
  }

  @action
  userJoined(newUsername: string): void {
    // TODO: server check?
    if (!this.userList.includes(newUsername)) {
      this.userList.push(newUsername);
      this.rootStore.chatStore.pushInformationMessage(
        `${newUsername} just entered the room.`
      );
      Logger.log(`new user joined: ${newUsername}`);
    }
  }

  userLeft(leftUsername: string): void {
    // TODO: server check?
    if (this.userList.includes(leftUsername)) {
      Logger.log(`${leftUsername} left the game`);
    }
  }
}
