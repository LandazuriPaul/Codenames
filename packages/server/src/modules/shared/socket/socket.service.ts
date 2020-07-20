import { createHash } from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

import { Team } from '@codenames/domain';

import { Room } from '~/entities';
import { ConfigService } from '~/modules/shared/config/config.service';
import { User } from '~/modules/user/user.class';

import { SocketRoomHash } from './socketRoomHash.type';
import { SocketRoomIdentifier } from './socketRoomIdentifier.interface';

@Injectable()
export class SocketService {
  private logger = new Logger(SocketService.name);
  private socketHashMap = new Map<SocketRoomHash, Set<Socket>>();

  constructor(private readonly configService: ConfigService) {}

  addSocketToUser(user: User, socket: Socket): void {
    const { roomHash, teamHash, userHash } = this.generateUserHashes(user);

    this.addSocketToSocketRoom(roomHash, socket);
    this.addSocketToSocketRoom(teamHash, socket);
    this.addSocketToSocketRoom(userHash, socket);
  }

  addSocketToSocketRoom(socketRoomHash: SocketRoomHash, socket: Socket): void {
    const sockets = this.socketHashMap.get(socketRoomHash) || new Set<Socket>();
    sockets.add(socket);
    this.socketHashMap.set(socketRoomHash, sockets);
  }

  getRoomSockets(room: Room): Set<Socket> {
    const roomHash = this.generateSocketRoomHash({ roomId: room._id });
    return this.socketHashMap.get(roomHash) || new Set<Socket>();
  }

  getTeamInRoomSockets(room: Room, team: Team): Set<Socket> {
    const teamHash = this.generateSocketRoomHash({
      roomId: room._id,
      team: team,
    });
    return this.socketHashMap.get(teamHash) || new Set<Socket>();
  }

  getUserSockets(user: User): Set<Socket> {
    const userHash = this.generateSocketRoomHash({
      roomId: user.room._id,
      username: user.username,
    });
    return this.socketHashMap.get(userHash) || new Set<Socket>();
  }

  emitToRoom(
    room: Room,
    event: string | symbol,
    message?: unknown,
    excludedSocketSet: Set<Socket> = new Set<Socket>()
  ): void {
    const roomSockets = this.getRoomSockets(room);
    this.emitToSocketSet(roomSockets, event, message, excludedSocketSet);
  }

  emitToTeamInRoom(
    room: Room,
    team: Team,
    event: string | symbol,
    message?: unknown,
    excludedSocketSet: Set<Socket> = new Set<Socket>()
  ): void {
    const roomSockets = this.getTeamInRoomSockets(room, team);
    this.emitToSocketSet(roomSockets, event, message, excludedSocketSet);
  }

  emitToUser(user: User, event: string | symbol, message?: unknown): void {
    const userSockets = this.getUserSockets(user);
    this.emitToSocketSet(userSockets, event, message);
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
    const sockets = this.socketHashMap.get(socketRoomHash);
    if (!sockets) {
      return;
    }
    sockets.delete(socket);
    if (sockets.size === 0) {
      this.socketHashMap.delete(socketRoomHash);
    } else {
      this.socketHashMap.set(socketRoomHash, sockets);
    }
  }

  private emitToSocketSet(
    socketSet: Set<Socket>,
    event: string | symbol,
    message?: unknown,
    excludedSocketSet: Set<Socket> = new Set<Socket>()
  ): void {
    const excludedSocketIdList = Array.from(excludedSocketSet).map(s => s.id);
    Array.from(socketSet)
      .filter(socket => !excludedSocketIdList.includes(socket.id))
      .forEach(socket => {
        socket.emit(event, message);
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
