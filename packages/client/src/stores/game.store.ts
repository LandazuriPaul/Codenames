import { action, computed, observable } from 'mobx';

import { Cell, CellStatus, CellType } from '@codenames/domain';

import { masterView } from '~/utils';

import { ChildStore } from './child.store';
import { RootStore } from './root.store';

export class GameStore extends ChildStore {
  @observable
  board: Cell[];

  @observable
  isSpyMaster: boolean;

  @observable
  winnerTeam: CellType.TeamA | CellType.TeamB | undefined;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.isSpyMaster = false;
  }

  getCellStatus(cellIndex: number): CellStatus {
    const cell = this.board[cellIndex];
    if (cell.isRevealed) {
      return cell.type;
    } else if (!this.isSpyMaster) {
      return 'hidden';
    }
    return masterView(cell.type);
  }

  @computed
  get remainingTeamACount(): number {
    return 9;
  }

  @computed
  get remainingTeamBCount(): number {
    return 8;
  }
}
