import { Team } from '@codenames/domain';

import { Room } from '~/modules/room/room.entity';

export class User {
  room: Room;
  team: Team;
  username: string;
  isHost: boolean;
  isSpyMaster: boolean;
  //  messages: Promise<Message[]>;

  constructor(
    room: Room,
    username: string,
    team: Team = Team.Observer,
    isHost = false,
    isSpyMaster = false
  ) {
    this.room = room;
    this.username = username;
    this.team = team;
    this.isHost = isHost;
    this.isSpyMaster = isSpyMaster;
  }
}
