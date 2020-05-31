import { createHash } from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { Room, Server, Socket } from 'socket.io';

import { Team } from '@codenames/domain';

import { ConfigService } from '~/modules/config/config.service';

@Injectable()
export class SocketService {
  public server: Server;
  private logger = new Logger(SocketService.name);

  constructor(private readonly configService: ConfigService) {}

  getRoom(roomId: string): Room | undefined {
    const hash = this.socketRoomHash({ roomId });
    return this.server.sockets.adapter.rooms[hash];
  }

  getTeamInRoom(roomId: string, team: Team): Room | undefined {
    const hash = this.socketRoomHash({ roomId, team });
    return this.server.sockets.adapter.rooms[hash];
  }

  getUserInRoom(roomId: string, username: string): Room | undefined {
    const hash = this.socketRoomHash({ roomId, username });
    return this.server.sockets.adapter.rooms[hash];
  }

  // pushUserToRoom(roomId: string, username: string) {}

  allocateSocketToRoom(socket: Socket, roomId: string): Socket {
    socket.join(roomId);
    return socket;
  }

  private socketRoomHash({
    roomId,
    team,
    username,
  }: SocketRoomIdentifier): string {
    let base = roomId;
    if (team) {
      base = `${team}@${base}`;
    } else if (username) {
      base = `${username}@${base}`;
    }
    return createHash(this.configService.socketRoomHashAlgorithm)
      .update(base)
      .digest(this.configService.socketRoomEncryptionFormat);
  }
}

interface SocketRoomIdentifier {
  roomId: string;
  team?: Team;
  username?: string;
}
