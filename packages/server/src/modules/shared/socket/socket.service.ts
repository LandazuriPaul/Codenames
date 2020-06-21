import { createHash } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { ConfigService } from '~/modules/shared/config/config.service';
import { User } from '~/modules/user/user.class';

@Injectable()
export class SocketService {
  private socketHashMap = new Map<string, Socket[]>();

  constructor(private readonly configService: ConfigService) {}

  addSocketToUser(user: User, socket: Socket): boolean {
    const userHash = this.getUserHash(user);
    const existingSockets = this.socketHashMap.get(userHash) || [];

    const sockets = [...existingSockets, socket];

    this.socketHashMap.set(userHash, sockets);

    return true;
  }

  getUserSockets(user: User): Socket[] {
    const userHash = this.getUserHash(user);
    return this.socketHashMap.get(userHash) || [];
  }

  removeSocketFromUser(user: User, socket: Socket): boolean {
    const userHash = this.getUserHash(user);
    const existingSockets = this.socketHashMap.get(userHash);

    if (!existingSockets) {
      return true;
    }

    const sockets = existingSockets.filter(s => s.id !== socket.id);

    if (!sockets.length) {
      this.socketHashMap.delete(userHash);
    } else {
      this.socketHashMap.set(userHash, sockets);
    }

    return true;
  }

  private getUserHash(user: User): string {
    const input = `${user.username}@${user.room._id}`;
    return createHash(this.configService.socketRoomHashAlgorithm)
      .update(input)
      .digest(this.configService.socketRoomEncryptionFormat);
  }
}
