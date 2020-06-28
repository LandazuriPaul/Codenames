import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from '@codenames/domain';

import { Room } from './room.entity';
import { RoomTeam, Teams } from './teams.entity';
import { RoomNotFound } from './room.exceptions';

@Injectable()
export class RoomService {
  private logger = new Logger(RoomService.name);

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ) {}

  async addUserToRoom(
    roomId: string,
    username: string,
    createIfNotFound = false
  ): Promise<Room> {
    try {
      const room = await this.getRoom(roomId);
      if (!room.usernames.has(username)) {
        room.usernames.add(username);
      }
      return this.assignUserToRoomTeam(room, username, Team.Observer);
    } catch (err) {
      if (!createIfNotFound) {
        throw err;
      }
      const room = await this.createRoom(roomId, username);
      return room;
    }
  }

  async createRoom(roomId: string, username: string): Promise<Room> {
    const newRoom = this.roomRepository.create({
      _id: roomId,
      host: username,
      teams: new Teams(),
      usernames: [username],
    });
    return this.assignUserToRoomTeam(newRoom, username, Team.Observer);
  }

  async getRoom(roomId: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ _id: roomId });
    if (!room) {
      throw new RoomNotFound(roomId);
    }
    return room;
  }

  private async assignUserToRoomTeam(
    room: Room,
    username: string,
    team: Team
  ): Promise<Room> {
    // remove user from other teams
    Object.entries(room.teams)
      .filter(currentRoomTeam => team !== currentRoomTeam[0])
      .forEach(([currentTeam, roomTeam]: [string, RoomTeam]) => {
        if (roomTeam.players.has(username)) {
          roomTeam.players.delete(username);
          if (roomTeam.sypMaster === username) {
            delete roomTeam.sypMaster;
          }
          room.teams[currentTeam as Team] = roomTeam;
        }
      });

    // add user to designated team
    room.teams[team].players.add(username);

    return this.roomRepository.save(room);
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
