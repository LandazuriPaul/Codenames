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
  static LOCALSTORAGE_KEY = 'ui';

  @persist
  @observable
  roomId: string;

  @observable
  roomSize: number;

  @persist
  @observable
  socketId: string;

  @persist
  @observable
  username: string;

  private socket: SocketIOClient.Socket;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.roomId = undefined;
    this.roomSize = 0;
    this.socketId = undefined;
    this.username = undefined;
  }

  connect(): void {
    this.socket = io(getNamespaceSocketUrl(SocketNamespace.Game));
    this.socket.on(SocketEvent.RoomJoined, this.roomJoined.bind(this));
    this.socket.on(SocketEvent.RoomLeft, this.roomLeft.bind(this));
    this.socket.on(SocketEvent.UserJoined, this.userJoined.bind(this));
    this.socket.on(SocketEvent.UserLeft, this.userLeft.bind(this));
    this.socket.on('userList', this.userList.bind(this));
  }

  joinRoom(roomId: string): void {
    this.connect();
    Logger.log(`joining room ${roomId} as ${this.username}`);
    this.socket.emit(SocketEvent.JoinRoom, { roomId, username: this.username });
  }

  @action
  roomJoined({ roomId, socketId, roomSize }: RoomJoinedMessage): void {
    this.roomId = roomId;
    this.socketId = socketId;
    this.roomSize = roomSize;
    Logger.log(
      `room ${this.roomId} (${this.roomSize} users) joined with self userId: ${this.socketId}`
    );
  }

  leaveRoom(): void {
    if (!this.socket) {
      return;
    }
    Logger.log(`leaving room ${this.roomId}`);
    this.socket.emit(SocketEvent.LeaveRoom, this.roomId);
  }

  @action
  roomLeft(roomId: string): void {
    Logger.log(`room ${roomId} left`);
    this.roomId = undefined;
  }

  @action
  setUsername(username: string): void {
    this.username = username;
  }

  @action
  userJoined(userId: string): void {
    Logger.log(`new user joined: ${userId}`);
  }

  @action
  userLeft(userId: string): void {
    Logger.log(`self user ${userId} left`);
    this.socketId = undefined;
  }

  userList(roomSize: number): void {
    Logger.log(`room size: ${roomSize}`);
  }
}
