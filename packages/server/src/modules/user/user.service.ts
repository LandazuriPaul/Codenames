import { Injectable, Logger } from '@nestjs/common';

import { Team } from '@codenames/domain';

import { Room } from '~/modules/room/room.entity';
import { RoomService } from '~/modules/room/room.service';

import { User } from './user.class';
import { UserNotFound } from './user.exceptions';

interface UserRole {
  isSpyMaster: boolean;
  team: Team;
}

const DEFAULT_ROLE: UserRole = {
  isSpyMaster: false,
  team: Team.Observer,
};

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private readonly roomService: RoomService) {}

  async getUser(roomId: string, username: string): Promise<User> {
    const room = await this.roomService.getRoom(roomId);
    if (!room.usernames.includes(username)) {
      throw new UserNotFound(roomId, username);
    }
    const { team, isSpyMaster } = this.getUserRoleInRoom(room, username);
    return new User(room, username, team, isSpyMaster);
  }

  private getUserRoleInRoom(room: Room, username: string): UserRole {
    const out = DEFAULT_ROLE;
    Object.entries(room.teams).some(([team, { players, sypMaster }]) => {
      if (sypMaster === username) {
        out.isSpyMaster = true;
        out.team = team as Team;
        return true;
      }
      if (players.includes(username)) {
        out.team = team as Team;
      }
      return false;
    });
    return out;
  }
}
