import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import io from 'socket.io-client';

import {
  AvailableLanguages,
  SocketEvent,
  SocketNamespace,
} from '@codenames/domain';

import { DEFAULT_LANGUAGE } from '~/config';
import { Logger, getNamespaceSocketUrl } from '~/utils';

import { ChildStore } from './child.store';
import { RootStore } from './root.store';

export class UiStore extends ChildStore {
  static LOCALSTORAGE_KEY = 'codenames';

  @observable
  lang: AvailableLanguages;

  @persist
  @observable
  roomId: string;

  @persist
  @observable
  isPlaying: boolean;

  private socket: SocketIOClient.Socket;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.isPlaying = false;
    this.lang = DEFAULT_LANGUAGE;
  }

  connect(): void {
    this.socket = io(getNamespaceSocketUrl(SocketNamespace.GAME));
    this.socket.on(SocketEvent.ROOM_JOINED, this.roomJoined.bind(this));
    this.socket.on(SocketEvent.ROOM_LEFT, this.roomLeft.bind(this));
  }

  joinRoom(roomId: string): void {
    this.connect();
    Logger.log(`joining room ${roomId}`);
    this.socket.emit(SocketEvent.JOIN_ROOM, roomId);
  }

  @action
  roomJoined(event: any): void {
    this.roomId = event.roomId;
    Logger.log(event);
    Logger.log(`room ${this.roomId} joined`);
  }

  leaveRoom(): void {
    Logger.log(`leaving room ${this.roomId}`);
    this.socket.emit(SocketEvent.LEAVE_ROOM, this.roomId);
  }

  @action
  roomLeft(event: any): void {
    Logger.log(`room ${this.roomId} left`);
    this.roomId = undefined;
    Logger.log(event);
  }
}
