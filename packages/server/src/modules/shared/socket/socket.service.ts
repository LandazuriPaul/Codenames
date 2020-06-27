import { createHash } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { Team } from '@codenames/domain';

import { ConfigService } from '~/modules/shared/config/config.service';
import { User } from '~/modules/user/user.class';
import { Room } from '~/modules/room/room.entity';

import { SocketRoomHash } from './socketRoomHash.type';
import { SocketRoomIdentifier } from './socketRoomIdentifier.interface';

@Injectable()
export class SocketService {
  private socketHashMap = new Map<string, Socket[]>();

  constructor(private readonly configService: ConfigService) {}

  addSocketToUser(user: User, socket: Socket): void {
    const { roomHash, teamHash, userHash } = this.generateUserHashes(user);
    this.addSocketToSocketRoom(roomHash, socket);
    this.addSocketToSocketRoom(teamHash, socket);
    this.addSocketToSocketRoom(userHash, socket);
  }

  addSocketToSocketRoom(socketRoomHash: SocketRoomHash, socket: Socket): void {
    const existingSockets = this.socketHashMap.get(socketRoomHash) || [];
    const sockets = [...existingSockets, socket];
    this.socketHashMap.set(socketRoomHash, sockets);
  }

  getRoomSockets(room: Room): Socket[] {
    const roomHash = this.generateSocketRoomHash({ roomId: room._id });
    return this.socketHashMap.get(roomHash) || [];
  }

  getTeamInRoomSockets(room: Room, team: Team): Socket[] {
    const teamHash = this.generateSocketRoomHash({
      roomId: room._id,
      team: team,
    });
    return this.socketHashMap.get(teamHash) || [];
  }

  getUserSockets(user: User): Socket[] {
    const userHash = this.generateSocketRoomHash({
      roomId: user.room._id,
      username: user.username,
    });
    return this.socketHashMap.get(userHash) || [];
  }

  emitToRoom(
    room: Room,
    event: string | symbol,
    message: unknown,
    excludedSocketList: Socket[] = []
  ): void {
    const roomSockets = this.getRoomSockets(room);
    this.emitToSocketList(roomSockets, event, message, excludedSocketList);
  }

  emitToTeamInRoom(
    room: Room,
    team: Team,
    event: string | symbol,
    message: unknown,
    excludedSocketList: Socket[] = []
  ): void {
    const roomSockets = this.getTeamInRoomSockets(room, team);
    this.emitToSocketList(roomSockets, event, message, excludedSocketList);
  }

  emitToUser(user: User, event: string | symbol, message: unknown): void {
    const userSockets = this.getUserSockets(user);
    this.emitToSocketList(userSockets, event, message);
  }

  removeSocketFromUser(user: User, socket: Socket): void {
    const { roomHash, teamHash, userHash } = this.generateUserHashes(user);
    this.removeSocketFromSocketRoom(roomHash, socket);
    this.removeSocketFromSocketRoom(teamHash, socket);
    this.removeSocketFromSocketRoom(userHash, socket);
  }

  removeSocketFromSocketRoom(
    socketRoomHash: SocketRoomHash,
    socket: Socket
  ): void {
    const existingSockets = this.socketHashMap.get(socketRoomHash);
    if (!existingSockets) {
      return;
    }
    const sockets = existingSockets.filter(s => s.id !== socket.id);
    if (sockets.length === 0) {
      this.socketHashMap.delete(socketRoomHash);
    } else {
      this.socketHashMap.set(socketRoomHash, sockets);
    }
  }

  private emitToSocketList(
    socketList: Socket[],
    event: string | symbol,
    message: unknown,
    excludedSocketList: Socket[] = []
  ): void {
    const excludedSocketIdList = excludedSocketList.map(s => s.id);
    socketList.forEach(socket => {
      if (!excludedSocketIdList.includes(socket.id)) {
        socket.emit(event, message);
      }
    });
  }

  private generateUserHashes(
    user: User
  ): {
    roomHash: SocketRoomHash;
    teamHash: SocketRoomHash;
    userHash: SocketRoomHash;
  } {
    return {
      roomHash: this.generateSocketRoomHash({ roomId: user.room._id }),
      userHash: this.generateSocketRoomHash({
        roomId: user.room._id,
        username: user.username,
      }),
      teamHash: this.generateSocketRoomHash({
        roomId: user.room._id,
        team: user.team,
      }),
    };
  }

  private generateSocketRoomHash({
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
