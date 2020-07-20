import { Column } from 'typeorm';

import {
  GameEnvelope,
  Board as IBoard,
  Cell as ICell,
  PlayingTeam,
  Team,
} from '@codenames/domain';

import { Cell } from './cell.entity';

export class Remaining {
  @Column()
  [Team.A]: number;

  @Column()
  [Team.B]: number;
}

export class Board implements IBoard {
  @Column()
  height: number;

  @Column()
  width: number;

  @Column(() => Cell)
  cells: Cell[];

  @Column(() => Remaining)
  remaining: Record<PlayingTeam, number>;

  constructor(
    height: number,
    width: number,
    cells: ICell[],
    remaining: Record<PlayingTeam, number>
  ) {
    this.height = height;
    this.width = width;
    this.remaining = remaining;
    if (cells) {
      this.cells = cells.map(cell => new Cell(cell));
    }
  }

  toJSON(): GameEnvelope['board'] {
    return {
      height: this.height,
      width: this.width,
      remaining: this.remaining,
      cells: this.cells.map(cell => ({
        ...cell,
        selectedBy: Array.from(cell.selectedBy),
      })),
    };
  }
}
