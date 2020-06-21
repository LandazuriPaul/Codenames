import { createHash } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { JwtPayload } from '@codenames/domain';

import { ConfigService } from '~/modules/shared/config/config.service';

interface UserIdentifier {
  roomId: string;
  username: string;
}

@Injectable()
export class SocketService {
  private socketHashMap = new Map<string, Socket[]>();

  constructor(private readonly configService: ConfigService) {}

  addSocketToUser(payload: JwtPayload, socket: Socket): boolean {
    const userHash = this.getUserHash(payload);
    const existingSockets = this.socketHashMap.get(userHash) || [];

    const sockets = [...existingSockets, socket];

    this.socketHashMap.set(userHash, sockets);

    return true;
  }

  getUserSockets(payload: JwtPayload): Socket[] {
    const userHash = this.getUserHash(payload);
    return this.socketHashMap.get(userHash) || [];
  }

  removeSocketFromUser(payload: JwtPayload, socket: Socket): boolean {
    const userHash = this.getUserHash(payload);
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

  private getUserHash({ roomId, username }: UserIdentifier): string {
    const input = `${username}@${roomId}`;
    return createHash(this.configService.socketRoomHashAlgorithm)
      .update(input)
      .digest(this.configService.socketRoomEncryptionFormat);
  }
}
