import { Column } from 'typeorm';

import {
  CodenameType,
  GameEnvelope,
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
  selectedBy: Set<string>;

  @Column()
  type: CodenameType;

  @Column()
  word: string;

  constructor(cell?: ICell) {
    if (cell) {
      this.isRevealed = cell.isRevealed;
      this.selectedBy = cell.selectedBy;
      this.type = cell.type;
      this.word = cell.word;
    }
  }

  mongoToJs(): void {
    this.selectedBy = new Set(this.selectedBy);
  }

  jsToMongo(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.selectedBy = Array.from(this.selectedBy);
  }
}

export class Board implements IBoard {
  @Column()
  height: number;

  @Column()
  width: number;

  @Column(() => Cell)
  cells: Cell[];

  constructor(height: number, width: number, cells: ICell[]) {
    this.height = height;
    this.width = width;
    if (cells) {
      this.cells = cells.map(cell => new Cell(cell));
    }
  }

  toJSON(): {
    height: number;
    width: number;
    cells: {
      selectedBy: string[];
      isRevealed: boolean;
      type: CodenameType;
      word: string;
    }[];
  } {
    return {
      height: this.height,
      width: this.width,
      cells: this.cells.map(cell => ({
        ...cell,
        selectedBy: Array.from(cell.selectedBy),
      })),
    };
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

  toJSON(): Omit<GameEnvelope, 'teams'> {
    return {
      board: this.board.toJSON(),
      currentTurn: this.currentTurn,
      timer: this.timer,
    };
  }
}
