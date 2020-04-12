import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import seedrandom from 'seedrandom';

import data from '~/data.json';
import { AvailableLanguages, Cell, CellStatus, CellType } from '~/domain';
import { getRandomInt, numericToStringSeed, shuffleArray } from '~/utils';

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

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init() {
    // in MobX strict mode we have to init properties within
    // an action function – the constructor cannot be decorated
    // as it is an *observable* object, we have to first initialise it
    this.board = [];
    this.isMasterMode = false;
  }

  @action
  resetBoard() {
    const newBoard = this.generateBoardFromSeed();
    this.board = newBoard;
  }

  @action
  setLang(lang: AvailableLanguages) {
    this.lang = lang;
  }

  @action
  setSeed(seed: string) {
    this.seed = seed;
  }

  @action
  revealCell(cellIndex: number) {
    if (!this.board[cellIndex].isRevealed) {
      this.board[cellIndex].isRevealed = true;
    }
  }

  @action
  enableMasterMode() {
    this.isMasterMode = true;
  }

  getCellStatus(cellIndex: number): CellStatus {
    if (this.isMasterMode || this.board[cellIndex].isRevealed) {
      return this.board[cellIndex].type;
    }
    return 'hidden';
  }

  getNewRandomSeed() {
    const numericSeed = getRandomInt(0, 1e9);
    return numericToStringSeed(numericSeed);
  }

  private generateBoardFromSeed() {
    seedrandom(this.seed, { global: true });
    const cellTypeList: CellType[] = [];
    for (let i = 0; i < GameStore.TURN_COUNT; i++) {
      cellTypeList.push(CellType.TeamA);
      cellTypeList.push(CellType.TeamB);
    }
    if (getRandomInt(0, 2) === 0) {
      cellTypeList.push(CellType.TeamA);
    } else {
      cellTypeList.push(CellType.TeamB);
    }
    cellTypeList.push(CellType.Excluded);
    for (
      let i = 0;
      i < GameStore.BOARD_SIZE - (2 * GameStore.TURN_COUNT + 2);
      i++
    ) {
      cellTypeList.push(CellType.Neutral);
    }
    const shuffledCellTypeList = shuffleArray(cellTypeList);
    const shuffledDictionary = shuffleArray(data[this.lang]).slice(
      0,
      GameStore.BOARD_SIZE
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
}
