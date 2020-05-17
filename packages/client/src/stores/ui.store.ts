import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import io from 'socket.io-client';

import {
  RoomJoinedMessage,
  SocketEvent,
  SocketNamespace,
} from '@codenames/domain';

import { Logger, getNamespaceSocketUrl } from '~/utils';

import { ChildStore } from './child.store';
import { RootStore } from './root.store';

export class UiStore extends ChildStore {
  static LOCALSTORAGE_KEY = 'codenames';

  @persist
  @observable
  isPlaying: boolean;

  @persist
  @observable
  roomId: string;

  @observable
  roomSize: number;

  @persist
  @observable
  userId: string;

  private socket: SocketIOClient.Socket;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.isPlaying = false;
    this.roomId = undefined;
    this.roomSize = 0;
    this.userId = undefined;
  }

  connect(): void {
    this.socket = io(getNamespaceSocketUrl(SocketNamespace.GAME));
    this.socket.on(SocketEvent.ROOM_JOINED, this.roomJoined.bind(this));
    this.socket.on(SocketEvent.ROOM_LEFT, this.roomLeft.bind(this));
    this.socket.on(SocketEvent.USER_JOINED, this.userJoined.bind(this));
    this.socket.on(SocketEvent.USER_LEFT, this.userLeft.bind(this));
    this.socket.on('userList', this.userList.bind(this));
  }

  joinRoom(roomId: string): void {
    this.connect();
    Logger.log(`joining room ${roomId}`);
    this.socket.emit(SocketEvent.JOIN_ROOM, roomId);
  }

  @action
  roomJoined({ roomId, userId, roomSize }: RoomJoinedMessage): void {
    this.roomId = roomId;
    this.userId = userId;
    this.roomSize = roomSize;
    Logger.log(
      `room ${this.roomId} (${this.roomSize} users) joined with self userId: ${this.userId}`
    );
  }

  leaveRoom(): void {
    if (!this.socket) {
      return;
    }
    Logger.log(`leaving room ${this.roomId}`);
    this.socket.emit(SocketEvent.LEAVE_ROOM, this.roomId);
  }

  @action
  roomLeft(roomId: string): void {
    Logger.log(`room ${roomId} left`);
    this.roomId = undefined;
  }

  @action
  userJoined(userId: string): void {
    Logger.log(`new user joined: ${userId}`);
  }

  @action
  userLeft(userId: string): void {
    Logger.log(`self user ${userId} left`);
    this.userId = undefined;
  }

  userList(roomSize: number): void {
    Logger.log(`room size: ${roomSize}`);
  }
}
