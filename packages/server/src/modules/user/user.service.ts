import { Injectable, Logger } from '@nestjs/common';

import { Team } from '@codenames/domain';

import { Room, RoomTeam } from '~/entities';
import { RoomService } from '~/modules/room/room.service';

import { User } from './user.class';
import { UserNotFound } from './user.exceptions';

interface UserRole {
  isHost: boolean;
  isSpyMaster: boolean;
  team: Team;
}

const DEFAULT_ROLE: UserRole = {
  isHost: false,
  isSpyMaster: false,
  team: Team.Observer,
};

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private readonly roomService: RoomService) {}

  async getUser(roomId: string, username: string): Promise<User> {
    const room = await this.roomService.getRoom(roomId);
    if (!room.usernames.has(username)) {
      throw new UserNotFound(roomId, username);
    }
    const { team, isHost, isSpyMaster } = this.getUserRoleInRoom(
      room,
      username
    );
    return new User(room, username, team, isHost, isSpyMaster);
  }

  private getUserRoleInRoom(room: Room, username: string): UserRole {
    const out = DEFAULT_ROLE;
    Object.entries(room.teams).some(
      ([team, { players, spyMaster: sypMaster }]: [string, RoomTeam]) => {
        if (sypMaster === username) {
          out.isSpyMaster = true;
          out.team = team as Team;
          return true;
        }
        if (players.has(username)) {
          out.team = team as Team;
        }
        return false;
      }
    );
    out.isHost = room.host === username;
    return out;
  }
}
