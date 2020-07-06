import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

import {
  Board,
  Codename,
  CodenameStatus,
  CodenameType,
  GameEnvelope,
  GameEvent,
  GameSettings,
  RoomTeam,
  Team,
  TeamColor,
  Teams,
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
  handleGameReady({ board, teams }: GameEnvelope): void {
    this.setBoard(board);
    this.setUserRoleInGame(teams);
    Logger.log('game ready');
  }

  /**
   * Helpers
   */

  setBoard(board: Board): void {
    this.boardHeight = board.height;
    this.boardWidth = board.width;
    this.board = board.codenames;
  }

  setUserRoleInGame(teams: Teams): void {
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
  }

  getCodenameStatus(cellIndex: number): CodenameStatus {
    const codename = this.board[cellIndex];
    if (this.isSpyMaster) {
      if (codename.isRevealed) {
        return masterView(codename.type);
      } else {
        return codename.type;
      }
    } else {
      if (codename.isRevealed) {
        return codename.type;
      } else {
        return 'hidden';
      }
    }
  }

  @computed
  get remainingTeamACount(): number {
    return this.board.reduce((count, codename) => {
      if (codename.type === CodenameType.TeamA && !codename.isRevealed) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  @computed
  get remainingTeamBCount(): number {
    return this.board.reduce((count, codename) => {
      if (codename.type === CodenameType.TeamB && !codename.isRevealed) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  @computed
  get teamACodenamesCount(): number {
    return this.board.reduce((count, codename) => {
      if (codename.type === CodenameType.TeamA) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  @computed
  get teamBCodenamesCount(): number {
    return this.board.reduce((count, codename) => {
      if (codename.type === CodenameType.TeamB) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  @computed
  get userColor(): TeamColor {
    return getTeamColor(this.userTeam);
  }
}
