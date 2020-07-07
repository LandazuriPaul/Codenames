import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

import {
  Board,
  Cell,
  CodenameState,
  CodenameStatus,
  CodenameType,
  GameEnvelope,
  GameEvent,
  GameSettings,
  RoomTeam,
  Team,
  TeamColor,
  Teams,
  Turn,
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

  @observable
  currentTurn: Turn;

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
  winnerTeam?: CodenameType.TeamA | CodenameType.TeamB;

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
  setCurrentTurn(turn: Turn): void {
    this.currentTurn = turn;
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
  handleGameReady({ board, currentTurn, teams }: GameEnvelope): void {
    this.currentTurn = currentTurn;
    this.setBoard(board);
    this.setUserRoleInGame(teams);
    // this.setCurrentTurn(turn);
    Logger.log('game ready');
  }

  /**
   * Helpers
   */

  @action
  reduceBoardState(boardState: CodenameState[]): void {
    boardState.forEach((codename, index) => {
      this.board[index].isRevealed = codename.isRevealed;
      this.board[index].selectedBy = codename.selectedBy;
    });
  }

  setBoard(board: Board): void {
    this.boardHeight = board.height;
    this.boardWidth = board.width;
    this.board = board.cells;
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

  getCellStatus(cellIndex: number): CodenameStatus {
    const cell = this.board[cellIndex];
    if (this.isSpyMaster) {
      if (cell.isRevealed) {
        return masterView(cell.type);
      } else {
        return cell.type;
      }
    } else {
      if (cell.isRevealed) {
        return cell.type;
      } else {
        return 'hidden';
      }
    }
  }

  @computed
  get remainingTeamACount(): number {
    return this.board.reduce((count, cell) => {
      if (cell.type === CodenameType.TeamA && !cell.isRevealed) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  @computed
  get remainingTeamBCount(): number {
    return this.board.reduce((count, cell) => {
      if (cell.type === CodenameType.TeamB && !cell.isRevealed) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  @computed
  get teamACodenamesCount(): number {
    return this.board.reduce((count, cell) => {
      if (cell.type === CodenameType.TeamA) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  @computed
  get teamBCodenamesCount(): number {
    return this.board.reduce((count, cell) => {
      if (cell.type === CodenameType.TeamB) {
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
