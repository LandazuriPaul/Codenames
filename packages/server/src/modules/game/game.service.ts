import { readFileSync } from 'fs';
import { join } from 'path';
import { Injectable, Logger } from '@nestjs/common';

import {
  AvailableLanguages,
  BoardSettings,
  Cell,
  CellType,
} from '@codenames/domain';

import { ConfigService } from '~/modules/shared/config/config.service';
import { getRandomInt, getShuffledSizedSlice, shuffleArray } from './utils';

interface Dictionary {
  clean: string[];
  dirty: string[];
}

@Injectable()
export class GameService {
  private logger = new Logger(GameService.name);

  private dictionaries: Record<AvailableLanguages, Dictionary>;

  constructor(private readonly configService: ConfigService) {
    this.loadDictionaries();
  }

  generateBoard({
    dirtyRatio,
    height,
    language,
    width,
  }: BoardSettings): Cell[] {
    const size = height * width;
    const dirtyDictLength = this.dictionaries[language as AvailableLanguages]
      .dirty.length;
    let dirtySize = Math.floor((dirtyRatio / 100) * size);
    if (dirtyDictLength < dirtySize) {
      dirtySize = dirtyDictLength;
    }
    const cleanSize = size - dirtySize;
    const words = this.getRandomWordsFromDictionary(
      language,
      cleanSize,
      dirtySize
    );
    return this.getBoardFromWords(words, size);
  }

  /**
   * Helpers
   */

  private getBoardFromWords(words: string[], size: number): Cell[] {
    const turnCount = Math.floor(size / 3);
    const cellTypeList: CellType[] = [];
    const remainingByCategory: Map<CellType, number> = new Map([
      [CellType.TeamA, 0],
      [CellType.TeamB, 0],
      [CellType.Neutral, 0],
      [CellType.Excluded, 1],
    ]);

    for (let i = 0; i < turnCount; i++) {
      cellTypeList.push(CellType.TeamA);
      remainingByCategory.set(
        CellType.TeamA,
        remainingByCategory.get(CellType.TeamA)! + 1
      );
      cellTypeList.push(CellType.TeamB);
      remainingByCategory.set(
        CellType.TeamB,
        remainingByCategory.get(CellType.TeamB)! + 1
      );
    }
    if (getRandomInt(0, 2) === 0) {
      cellTypeList.push(CellType.TeamA);
      remainingByCategory.set(
        CellType.TeamA,
        remainingByCategory.get(CellType.TeamA)! + 1
      );
    } else {
      cellTypeList.push(CellType.TeamB);
      remainingByCategory.set(
        CellType.TeamB,
        remainingByCategory.get(CellType.TeamB)! + 1
      );
    }

    cellTypeList.push(CellType.Excluded);
    for (let i = 0; i < size - (2 * turnCount + 2); i++) {
      cellTypeList.push(CellType.Neutral);
      remainingByCategory.set(
        CellType.Neutral,
        remainingByCategory.get(CellType.Neutral)! + 1
      );
    }

    const shuffledCellTypeList = shuffleArray(cellTypeList);
    const newBoard: Cell[] = [];

    for (let i = 0; i < size; i++) {
      newBoard.push({
        index: i,
        word: words[i],
        type: shuffledCellTypeList[i],
        isRevealed: false,
      });
    }

    return newBoard;
  }

  private getRandomWordsFromDictionary(
    language: AvailableLanguages,
    cleanSize: number,
    dirtySize: number
  ): string[] {
    const cleanSlice = getShuffledSizedSlice(
      this.dictionaries[language].clean,
      cleanSize
    );
    const dirtySlice = getShuffledSizedSlice(
      this.dictionaries[language].dirty,
      dirtySize
    );
    return shuffleArray([...cleanSlice, ...dirtySlice]);
  }

  private loadDictionaries(): void {
    const dictionaries: Partial<Record<AvailableLanguages, Dictionary>> = {};
    (Object.values(AvailableLanguages) as AvailableLanguages[]).forEach(
      lang => {
        dictionaries[lang] = this.getLangDictionary(lang);
      }
    );
    this.dictionaries = dictionaries as Record<AvailableLanguages, Dictionary>;
  }

  private getLangDictionary(lang: AvailableLanguages): Dictionary {
    const folder = join(this.configService.dictionariesPath, lang);
    const cleanFilePath = join(folder, `clean.${lang}.txt`);
    const dirtyFilePath = join(folder, `dirty.${lang}.txt`);
    const clean = readFileSync(cleanFilePath)
      .toString()
      .trim()
      .split('\n');
    const dirty = readFileSync(dirtyFilePath)
      .toString()
      .trim()
      .split('\n');
    return {
      clean,
      dirty,
    };
  }
}
