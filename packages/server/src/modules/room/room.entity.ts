import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Team } from '@codenames/domain';

@Entity('rooms')
export class Room {
  @ObjectIdColumn()
  _id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  teams: Record<Team, RoomTeam>;

  @Column()
  usernames: string[];
}

class RoomTeam {
  players: string[];
  sypMaster?: string;
}
