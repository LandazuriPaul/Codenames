import { Column } from 'typeorm';

import {
  GameEnvelope,
  Game as IGame,
  PlayingTeam,
  Turn,
} from '@codenames/domain';

import { Board } from './board.entity';
import { Timer } from './timer.entity';

export class Game implements IGame {
  @Column(() => Board)
  board: Board;

  @Column()
  currentTurn: Turn;

  @Column(() => Timer)
  timer: Timer;

  @Column()
  winner?: PlayingTeam;

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
      winner: this.winner,
    };
  }
}
