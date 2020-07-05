import { Column } from 'typeorm';

import {
  CodenameType,
  Board as IBoard,
  Codename as ICodename,
  Game as IGame,
  TimerSettings,
} from '@codenames/domain';

export class Codename implements ICodename {
  @Column()
  isRevealed: boolean;

  @Column()
  isSelected: boolean;

  @Column()
  type: CodenameType;

  @Column()
  word: string;
}

export class Board implements IBoard {
  @Column()
  height: number;

  @Column()
  width: number;

  @Column(() => Codename)
  codenames: Codename[];

  constructor(height: number, width: number, codenames: Codename[]) {
    this.height = height;
    this.width = width;
    this.codenames = codenames;
  }
}

export class Timer implements TimerSettings {
  @Column()
  guess: number;

  @Column()
  hint: number;

  constructor(guess: number, hint: number) {
    this.guess = guess;
    this.hint = hint;
  }
}

export class Game implements IGame {
  @Column(() => Board)
  board: Board;

  @Column(() => Timer)
  timer: Timer;

  constructor(board: Board, timer: Timer) {
    this.board = board;
    this.timer = timer;
  }
}
