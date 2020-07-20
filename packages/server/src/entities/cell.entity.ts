import { Column } from 'typeorm';

import { CodenameType, Cell as ICell } from '@codenames/domain';

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
