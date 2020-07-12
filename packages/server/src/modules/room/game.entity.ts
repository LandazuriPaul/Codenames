import { Column } from 'typeorm';

import {
  CodenameType,
  Board as IBoard,
  Cell as ICell,
  Game as IGame,
  TimerSettings,
  Turn,
} from '@codenames/domain';

export class Cell implements ICell {
  @Column()
  isRevealed: boolean;

  @Column()
  selectedBy: string[];

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

  @Column(() => Cell)
  cells: Cell[];

  constructor(height: number, width: number, cells: Cell[]) {
    this.height = height;
    this.width = width;
    this.cells = cells;
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

  @Column()
  currentTurn: Turn;

  @Column(() => Timer)
  timer: Timer;

  constructor(board: Board, currentTurn: Turn, timer: Timer) {
    this.board = board;
    this.currentTurn = currentTurn;
    this.timer = timer;
  }
}
