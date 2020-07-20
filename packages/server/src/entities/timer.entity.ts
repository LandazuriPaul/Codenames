import { Column } from 'typeorm';

import { TimerSettings } from '@codenames/domain';

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
