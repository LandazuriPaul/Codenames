import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

import { Team } from '@codenames/domain';

import { SocketService } from '~/modules/socket/socket.service';
import { SocketRoomHash } from '~/modules/socket/socketRoomHash.type';

import { RoomNotFound, TeamNotFound, UserNotFound } from './room.exceptions';

@Injectable()
export class RoomService {
  private logger = new Logger(RoomService.name);

  constructor(private readonly socketService: SocketService) {}

  getRoom(roomId: string): SocketRoomHash {
    try {
      return this.socketService.getSocketRoom({ roomId });
    } catch (err) {
      throw new RoomNotFound(roomId);
    }
  }

  getTeamInRoom(roomId: string, team: Team): SocketRoomHash {
    try {
      return this.socketService.getSocketRoom({ roomId, team });
    } catch (err) {
      throw new TeamNotFound(roomId, team);
    }
  }

  getUserInRoom(roomId: string, username: string): SocketRoomHash {
    try {
      return this.socketService.getSocketRoom({ roomId, username });
    } catch (err) {
      throw new UserNotFound(roomId, username);
    }
  }

  pushSocketToRoom(socket: Socket, roomId: string): SocketRoomHash {
    return this.socketService.pushSocketToSocketRoom(socket, { roomId });
  }

  pushSocketToTeam(socket: Socket, roomId: string, team: Team): SocketRoomHash {
    return this.socketService.pushSocketToSocketRoom(socket, { roomId, team });
  }

  pushSocketToUser(
    socket: Socket,
    roomId: string,
    username: string
  ): SocketRoomHash {
    return this.socketService.pushSocketToSocketRoom(socket, {
      roomId,
      username,
    });
  }
}
