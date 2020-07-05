import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
} from 'typeorm';

import { Teams as ITeams, Team } from '@codenames/domain';

export class RoomTeam {
  @Column()
  players: Set<string>;

  @Column()
  spyMaster?: string;

  constructor() {
    this.players = new Set<string>();
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  mongoToJs(): void {
    this.players = new Set(this.players);
  }

  @BeforeInsert()
  @BeforeUpdate()
  jsToMongo(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.players = Array.from(this.players);
  }
}

export class Teams implements ITeams {
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
