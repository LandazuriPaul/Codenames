import { Injectable, Logger } from '@nestjs/common';

import { RoomService } from '~/modules/room/room.service';

import { User } from './user.entity';
import { UserNotFound } from './user.exceptions';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private readonly roomService: RoomService) {}

  async getUser(roomId: string, username: string): Promise<User> {
    // TODO
    const user = await this.roomService.getRoom(roomId);
    if (!user) {
      throw new UserNotFound(roomId, username);
    }
    return user;
  }
}
