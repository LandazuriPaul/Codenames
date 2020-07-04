import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

import {
  Cell,
  CellStatus,
  CellType,
  GameEvent,
  GameSettings,
  NewGameEnvelope,
  Team,
  TeamColor,
} from '@codenames/domain';

import { Logger, getTeamColor, masterView } from '~/utils';

import { SocketEmitterStore } from './socketEmitter.store';
import { RootStore } from './root.store';

export class GameStore extends SocketEmitterStore {
  static LOCALSTORAGE_KEY = 'game';

  @observable
  board: Cell[];

  @observable
  boardHeight: number;

  @observable
  boardWidth: number;

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

  /*
   * Emitters
   */

  generateGame(settings: GameSettings): void {
    Logger.log('requesting for board generation with the following settings');
    Logger.log({ settings });
    this.emit(GameEvent.GenerateGame, settings);
  }

  /*
   * Listeners
   */

  @action
  handleGameReady({ board, boardHeight, boardWidth }: NewGameEnvelope): void {
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.board = board;
    Logger.log('game ready');
  }

  /**
   * Helpers
   */

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
