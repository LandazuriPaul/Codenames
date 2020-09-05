import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';
import seedrandom from 'seedrandom';

import data from '~/data.json';
import { AvailableLanguages, Cell, CellStatus, CellType } from '~/domain';
import {
  getRandomInt,
  getShuffledSizedSlice,
  masterView,
  numericToStringSeed,
  shuffleArray,
} from '~/utils';

import { ChildStore } from './child.store';
import { RootStore } from './root.store';

export class GameStore extends ChildStore {
  static LOCALSTORAGE_KEY = 'codenames';

  static ROW_COUNT = 5;
  static COL_COUNT = 5;

  static BOARD_SIZE = GameStore.COL_COUNT * GameStore.ROW_COUNT;
  static TURN_COUNT = Math.floor(GameStore.BOARD_SIZE / 3);

  @persist
  @observable
  lang: AvailableLanguages;

  @persist
  @observable
  seed: string;

  @observable
  board: Cell[];

  @observable
  isMasterMode: boolean;

  @observable
  dirtyRatio: number;

  @observable
  winnerTeam: CellType.TeamA | CellType.TeamB | undefined;

  @observable
  private remainingByCategory: Map<CellType, number>;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    // in MobX strict mode we have to init properties within
    // an action function – the constructor cannot be decorated
    // as it is an *observable* object, we have to first initialise it
    this.isMasterMode = false;
    this.winnerTeam = undefined;
    this.remainingByCategory = new Map([
      [CellType.TeamA, 0],
      [CellType.TeamB, 0],
      [CellType.Neutral, 0],
      [CellType.Excluded, 1],
    ]);
  }

  @action
  resetBoard(): void {
    this.init();
    const newBoard = this.generateBoardFromSeed();
    this.rootStore.uiStore.setIsInGame(true);
    this.board = newBoard;
  }

  @action
  setLang(lang: AvailableLanguages): void {
    this.lang = lang;
  }

  @action
  setDirtyRatio(dirtyRatio: number): void {
    this.dirtyRatio = dirtyRatio;
  }

  @action
  setSeed(seed: string): void {
    this.seed = seed;
  }

  @action
  revealCell(cellIndex: number): void {
    const cell = this.board[cellIndex];
    if (!cell.isRevealed) {
      cell.isRevealed = true;
      this.remainingByCategory.set(
        cell.type,
        this.remainingByCategory.get(cell.type) - 1
      );
      if (
        this.remainingByCategory.get(cell.type) === 0 &&
        !this.winnerTeam &&
        (cell.type === CellType.TeamA || cell.type === CellType.TeamB)
      ) {
        this.winnerTeam = cell.type;
      }
    }
  }

  @computed
  get remainingTeamACount(): number {
    return this.remainingByCategory.get(CellType.TeamA);
  }

  @computed
  get remainingTeamBCount(): number {
    return this.remainingByCategory.get(CellType.TeamB);
  }

  @action
  enableMasterMode(): void {
    this.isMasterMode = true;
  }

  getCellStatus(cellIndex: number): CellStatus {
    const cell = this.board[cellIndex];
    if (cell.isRevealed) {
      return cell.type;
    } else if (!this.isMasterMode) {
      return 'hidden';
    }
    return masterView(cell.type);
  }

  getNewRandomSeed(): string {
    const numericSeed = getRandomInt(0, 1e9);
    return numericToStringSeed(numericSeed).toUpperCase();
  }

  private generateBoardFromSeed(): Cell[] {
    // fake random around seed
    seedrandom(this.seed, { global: true });

    // dirty level
    const dirtyDictLength = data[this.lang].dirty.length;
    let dirtySize = Math.floor((this.dirtyRatio / 100) * GameStore.BOARD_SIZE);
    if (dirtyDictLength < dirtySize) {
      dirtySize = dirtyDictLength;
    }
    const cleanSize = GameStore.BOARD_SIZE - dirtySize;

    const cellTypeList: CellType[] = [];
    for (let i = 0; i < GameStore.TURN_COUNT; i++) {
      cellTypeList.push(CellType.TeamA);
      this.remainingByCategory.set(
        CellType.TeamA,
        this.remainingByCategory.get(CellType.TeamA) + 1
      );
      cellTypeList.push(CellType.TeamB);
      this.remainingByCategory.set(
        CellType.TeamB,
        this.remainingByCategory.get(CellType.TeamB) + 1
      );
    }
    if (getRandomInt(0, 2) === 0) {
      cellTypeList.push(CellType.TeamA);
      this.remainingByCategory.set(
        CellType.TeamA,
        this.remainingByCategory.get(CellType.TeamA) + 1
      );
    } else {
      cellTypeList.push(CellType.TeamB);
      this.remainingByCategory.set(
        CellType.TeamB,
        this.remainingByCategory.get(CellType.TeamB) + 1
      );
    }
    cellTypeList.push(CellType.Excluded);
    for (
      let i = 0;
      i < GameStore.BOARD_SIZE - (2 * GameStore.TURN_COUNT + 2);
      i++
    ) {
      cellTypeList.push(CellType.Neutral);
      this.remainingByCategory.set(
        CellType.Neutral,
        this.remainingByCategory.get(CellType.Neutral) + 1
      );
    }
    const shuffledCellTypeList = shuffleArray(cellTypeList);
    const shuffledDictionary = this.getRandomWordsFromDictionary(
      cleanSize,
      dirtySize
    );
    const newBoard: Cell[] = [];
    for (let i = 0; i < GameStore.BOARD_SIZE; i++) {
      newBoard.push({
        index: i,
        word: shuffledDictionary[i],
        type: shuffledCellTypeList[i],
        isRevealed: false,
      });
    }
    return newBoard;
  }

  private getRandomWordsFromDictionary(
    cleanSize: number,
    dirtySize: number
  ): string[] {
    const cleanSlice = getShuffledSizedSlice(data[this.lang].clean, cleanSize);
    const dirtySlice = getShuffledSizedSlice(data[this.lang].dirty, dirtySize);
    return shuffleArray([...cleanSlice, ...dirtySlice]);
  }
}
