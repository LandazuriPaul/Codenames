import { createHash } from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ConfigService } from '~/modules/config/config.service';
import { SocketRoomNotFound } from './socket.exceptions';
import { SocketRoomIdentifier } from './socketRoomIdentifier.interface';
import { SocketRoomHash } from './socketRoomHash.type';

@Injectable()
export class SocketService {
  public server: Server;
  private logger = new Logger(SocketService.name);

  constructor(private readonly configService: ConfigService) {}

  pushSocketToRoom(
    socket: Socket,
    identifier: SocketRoomIdentifier
  ): SocketRoomHash {
    const hash = this.socketRoomHash(identifier);
    socket.join(hash);
    return this.getSocketRoom(identifier);
  }

  getSocketRoom(identifier: SocketRoomIdentifier): SocketRoomHash {
    const hash = this.socketRoomHash(identifier);
    const room = this.server.sockets.adapter.rooms[hash];
    if (!room) {
      throw new SocketRoomNotFound();
    }
    return hash;
  }

  private socketRoomHash({
    roomId,
    team,
    username,
  }: SocketRoomIdentifier): SocketRoomHash {
    let base = roomId;
    if (team) {
      base = `${team}@${base}`;
    } else if (username) {
      base = `${username}@${base}`;
    }
    return createHash(this.configService.socketRoomHashAlgorithm)
      .update(base)
      .digest(this.configService.socketRoomEncryptionFormat) as SocketRoomHash;
  }
}
