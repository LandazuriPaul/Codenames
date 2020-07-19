import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

import {
  Cell,
  CellSelectedEnvelope,
  CodenameState,
  CodenameStatus,
  CodenameType,
  GameEnvelope,
  GameEvent,
  GameReadyEnvelope,
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

  @persist('list')
  @observable
  board: Cell[];

  @persist
  @observable
  boardHeight: number;

  @persist
  @observable
  boardWidth: number;

  @persist
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

  onCellClick(cellIndex: number): void {
    Logger.log(`cell ${cellIndex} clicked`);
    if (!this.isPlaying || this.isSpyMaster || !this.isMyTurn()) {
      return;
    }
    Logger.log('my turn!');
    this.emit(GameEvent.SelectCell, cellIndex);
  }

  /*
   * Listeners
   */

  handleGameReady({
    game: { board, currentTurn },
    teams,
  }: GameReadyEnvelope): void {
    Logger.log('game ready');
    this.setCurrentTurn(currentTurn);
    this.setBoard(board);
    this.setUserRoleInGame(teams);
  }

  @action
  handleCellSelected({
    newIndex,
    oldIndex,
    username,
  }: CellSelectedEnvelope): void {
    if (oldIndex) {
      this.board[oldIndex].selectedBy.delete(username);
    }
    this.board[newIndex].selectedBy.add(username);
  }

  /**
   * Helpers
   */

  // TODO: remove?
  @action
  reduceBoardState(boardState: CodenameState[]): void {
    boardState.forEach((codename, index) => {
      this.board[index].isRevealed = codename.isRevealed;
      this.board[index].selectedBy = codename.selectedBy;
    });
  }

  setGame({ board, currentTurn }: GameEnvelope): void {
    this.rootStore.gameStore.setBoard(board);
    this.rootStore.gameStore.setCurrentTurn(currentTurn);
    this.isPlaying = true;
    Logger.log(currentTurn);
  }

  @action
  setBoard(board: GameEnvelope['board']): void {
    this.boardHeight = board.height;
    this.boardWidth = board.width;
    this.board = board.cells.map(cell => ({
      ...cell,
      selectedBy: new Set(cell.selectedBy),
    }));
  }

  @action
  setUserRoleInGame(teams: Teams): void {
    const { username } = this.rootStore.roomStore;
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

  /**
   * Getters
   */

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

  private isMyTurn(): boolean {
    if (
      this.userTeam === Team.Observer ||
      (this.userTeam === Team.A &&
        [Turn.BGuess, Turn.BHint].includes(this.currentTurn)) ||
      (this.userTeam === Team.B &&
        [Turn.AGuess, Turn.AHint].includes(this.currentTurn)) ||
      (this.isSpyMaster &&
        [Turn.AGuess, Turn.BGuess].includes(this.currentTurn)) ||
      (!this.isSpyMaster && [Turn.AHint, Turn.BHint].includes(this.currentTurn))
    ) {
      return false;
    }
    return true;
  }
}
