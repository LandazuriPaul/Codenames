import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Teams } from './teams.entity';

@Entity('rooms')
export class Room {
  @ObjectIdColumn()
  _id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column(() => Teams)
  teams: Teams;

  @Column()
  usernames: Set<string>;

  get size(): number {
    return this.usernames.size;
  }

  @AfterLoad()
  mongoToJs(): void {
    this.usernames = new Set<string>(this.usernames);
  }
}
