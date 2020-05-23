import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

import {
  Cell,
  CellStatus,
  CellType,
  GameSettings,
  Team,
  TeamColor,
} from '@codenames/domain';

import { Logger, getTeamColor, masterView } from '~/utils';

import { ChildStore } from './child.store';
import { RootStore } from './root.store';

export class GameStore extends ChildStore {
  static LOCALSTORAGE_KEY = 'game';

  @observable
  board: Cell[];

  @persist
  @observable
  isPlaying: boolean;

  @persist
  @observable
  isSpyMaster: boolean;

  @persist
  @observable
  userTeam: Team;

  @observable
  winnerTeam: CellType.TeamA | CellType.TeamB | undefined;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.board = [];
    this.isPlaying = false;
    this.isSpyMaster = false;
    this.userTeam = Team.Observer;
  }

  @action
  generateGame(settings: GameSettings): void {
    Logger.info('requesting for board generation with the following settings');
    Logger.info(settings);
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
  get userColor(): TeamColor {
    return getTeamColor(this.userTeam);
  }
}
