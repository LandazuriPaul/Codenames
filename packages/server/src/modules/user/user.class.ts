import { Team } from '@codenames/domain';

import { Room } from '~/modules/room/room.entity';

export class User {
  room: Room;
  team: Team;
  username: string;
  isSpyMaster: boolean;
  //  messages: Promise<Message[]>;

  constructor(
    room: Room,
    username: string,
    team: Team = Team.Observer,
    isSpyMaster = false
  ) {
    this.room = room;
    this.username = username;
    this.team = team;
    this.isSpyMaster = isSpyMaster;
  }
}
