import { readFileSync } from 'fs';
import { join } from 'path';
import { Injectable, Logger } from '@nestjs/common';

import {
  AvailableLanguages,
  BoardSettings,
  Codename,
  CodenameType,
} from '@codenames/domain';

import { ConfigService } from '~/modules/shared/config/config.service';
import { Board } from '~/modules/room/game.entity';

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

  generateBoard({ dirtyRatio, height, language, width }: BoardSettings): Board {
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
    const codenames = this.getBoardFromWords(words, size);
    return new Board(height, width, codenames);
  }

  /**
   * Helpers
   */

  private getBoardFromWords(words: string[], size: number): Codename[] {
    const turnCount = Math.floor(size / 3);
    const CodenameTypeList: CodenameType[] = [];
    const remainingByCategory: Map<CodenameType, number> = new Map([
      [CodenameType.TeamA, 0],
      [CodenameType.TeamB, 0],
      [CodenameType.Neutral, 0],
      [CodenameType.Excluded, 1],
    ]);

    for (let i = 0; i < turnCount; i++) {
      CodenameTypeList.push(CodenameType.TeamA);
      remainingByCategory.set(
        CodenameType.TeamA,
        remainingByCategory.get(CodenameType.TeamA)! + 1
      );
      CodenameTypeList.push(CodenameType.TeamB);
      remainingByCategory.set(
        CodenameType.TeamB,
        remainingByCategory.get(CodenameType.TeamB)! + 1
      );
    }
    if (getRandomInt(0, 2) === 0) {
      CodenameTypeList.push(CodenameType.TeamA);
      remainingByCategory.set(
        CodenameType.TeamA,
        remainingByCategory.get(CodenameType.TeamA)! + 1
      );
    } else {
      CodenameTypeList.push(CodenameType.TeamB);
      remainingByCategory.set(
        CodenameType.TeamB,
        remainingByCategory.get(CodenameType.TeamB)! + 1
      );
    }

    CodenameTypeList.push(CodenameType.Excluded);
    for (let i = 0; i < size - (2 * turnCount + 2); i++) {
      CodenameTypeList.push(CodenameType.Neutral);
      remainingByCategory.set(
        CodenameType.Neutral,
        remainingByCategory.get(CodenameType.Neutral)! + 1
      );
    }

    const shuffledCodenameTypeList = shuffleArray(CodenameTypeList);
    const newBoard: Codename[] = [];

    for (let i = 0; i < size; i++) {
      newBoard.push({
        word: words[i],
        type: shuffledCodenameTypeList[i],
        isRevealed: false,
        isSelected: false,
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
