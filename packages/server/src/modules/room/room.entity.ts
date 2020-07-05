import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Game } from './game.entity';
import { Teams } from './teams.entity';

@Entity('rooms')
export class Room {
  @ObjectIdColumn()
  _id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  host: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column(() => Teams)
  teams: Teams;

  @Column()
  usernames: Set<string>;

  @Column(() => Game)
  game?: Game;

  get size(): number {
    return this.usernames.size;
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  mongoToJs(): void {
    this.usernames = new Set(this.usernames);
  }

  @BeforeInsert()
  @BeforeUpdate()
  jsToMongo(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.usernames = Array.from(this.usernames);
  }
}
