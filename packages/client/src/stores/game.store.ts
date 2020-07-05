import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

import {
  Codename,
  CodenameStatus,
  CodenameType,
  GameEvent,
  GameSettings,
  NewGameEnvelope,
  RoomTeam,
  Team,
  TeamColor,
} from '@codenames/domain';

import { Logger, getTeamColor, masterView } from '~/utils';

import { SocketEmitterStore } from './socketEmitter.store';
import { RootStore } from './root.store';

export class GameStore extends SocketEmitterStore {
  static LOCALSTORAGE_KEY = 'game';

  @observable
  board: Codename[];

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
  winnerTeam: CodenameType.TeamA | CodenameType.TeamB | undefined;

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
  handleGameReady({ board, teams }: NewGameEnvelope): void {
    this.boardHeight = board.height;
    this.boardWidth = board.width;
    this.board = board.codenames;
    const { username } = this.rootStore.uiStore;
    (Object.entries(teams) as [Team, RoomTeam][]).forEach(
      ([team, { players, spyMaster }]) => {
        if (players.includes(username)) {
          this.userTeam = team;

          if (spyMaster === username) {
            this.isSpyMaster = true;
          }
        }
      }
    );
    Logger.log('game ready');
  }

  /**
   * Helpers
   */

  getCodenameStatus(cellIndex: number): CodenameStatus {
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
