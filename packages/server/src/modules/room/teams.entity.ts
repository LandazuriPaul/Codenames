import { AfterLoad, Column } from 'typeorm';

import { Team } from '@codenames/domain';

export class RoomTeam {
  @Column()
  players: Set<string>;

  @Column({ name: 'spy_master' })
  sypMaster?: string;

  constructor() {
    this.players = new Set<string>();
  }

  @AfterLoad()
  mongoToJs(): void {
    this.players = new Set<string>(this.players);
  }
}

export class Teams {
  @Column(() => RoomTeam)
  [Team.A]: RoomTeam;

  @Column(() => RoomTeam)
  [Team.B]: RoomTeam;

  @Column(() => RoomTeam)
  [Team.Observer]: RoomTeam;

  constructor() {
    this[Team.A] = new RoomTeam();
    this[Team.B] = new RoomTeam();
    this[Team.Observer] = new RoomTeam();
  }
}
