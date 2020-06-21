import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './room.entity';

import { RoomNotFound, TeamNotFound } from './room.exceptions';

@Injectable()
export class RoomService {
  private logger = new Logger(RoomService.name);

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ) {}

  async getRoom(roomId: string): Promise<Room> {
    const room = await this.roomRepository.findOne(roomId);
    if (!room) {
      throw new RoomNotFound(roomId);
    }
    return room;
  }

  // getTeamInRoom(roomId: string, team: Team): SocketRoomHash {
  //   try {
  //     return this.socketService.getSocketRoom({ roomId, team });
  //   } catch (err) {
  //     throw new TeamNotFound(roomId, team);
  //   }
  // }

  // pushSocketToRoom(socket: Socket, roomId: string): SocketRoomHash {
  //   return this.socketService.pushSocketToSocketRoom(socket, { roomId });
  // }

  // pushSocketToTeam(socket: Socket, roomId: string, team: Team): SocketRoomHash {
  //   return this.socketService.pushSocketToSocketRoom(socket, { roomId, team });
  // }

  // pushSocketToUser(
  //   socket: Socket,
  //   roomId: string,
  //   username: string
  // ): SocketRoomHash {
  //   return this.socketService.pushSocketToSocketRoom(socket, {
  //     roomId,
  //     username,
  //   });
  // }
}
