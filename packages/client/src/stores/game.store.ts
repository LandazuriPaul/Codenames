import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

import {
  Cell,
  CellStatus,
  CellType,
  UserColor,
  UserTeam,
} from '@codenames/domain';

import { getTeamColor, masterView } from '~/utils';

import { ChildStore } from './child.store';
import { RootStore } from './root.store';

export class GameStore extends ChildStore {
  static LOCALSTORAGE_KEY = 'game';

  @observable
  board: Cell[];

  @persist
  @observable
  isSpyMaster: boolean;

  @persist
  @observable
  userTeam: UserTeam;

  @observable
  winnerTeam: CellType.TeamA | CellType.TeamB | undefined;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.isSpyMaster = false;
    this.userTeam = UserTeam.Observer;
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

  @computed
  get userColor(): UserColor {
    return getTeamColor(this.userTeam);
  }
}
