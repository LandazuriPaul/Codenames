import { readFileSync } from 'fs';
import { join } from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AvailableLanguages,
  BoardSettings,
  Cell,
  CodenameType,
  PlayingTeam,
  Team,
  Turn,
} from '@codenames/domain';
import { getTeamsTurn } from '@codenames/lib';

import { Board, Game, Room } from '~/entities';
import { ConfigService } from '~/modules/shared/config/config.service';

import { getRandomInt, getShuffledSizedSlice, shuffleArray } from './utils';

interface Dictionary {
  clean: string[];
  dirty: string[];
}

export interface SelectCellByUserOutcome {
  oldIndex: number | undefined;
  nextTurn?: PlayingTeam;
  remaining?: Record<PlayingTeam, number>;
  winner?: PlayingTeam;
}

@Injectable()
export class GameService {
  private logger = new Logger(GameService.name);

  private dictionaries: Record<AvailableLanguages, Dictionary>;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ) {
    this.loadDictionaries();
  }

  generateBoard({
    dirtyRatio,
    height,
    language,
    width,
  }: BoardSettings): { board: Board; firstTurn: Turn.AHint | Turn.BHint } {
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
    const { cells, firstTurn, remaining } = this.getBoardFromWords(words, size);
    return {
      board: new Board(height, width, cells, remaining),
      firstTurn,
    };
  }

  async selectCellByUser(
    room: Room,
    cellIndex: number,
    username: string
  ): Promise<SelectCellByUserOutcome> {
    const out: SelectCellByUserOutcome = {
      oldIndex: undefined,
    };
    if (!room.game) {
      return out;
    }

    // get old selection
    const oldIndex = room.game.board.cells.findIndex(cell =>
      cell.selectedBy.has(username)
    );
    if (oldIndex !== -1) {
      room.game.board.cells[oldIndex].selectedBy.delete(username);
      out.oldIndex = oldIndex;
    }

    // set new selection
    room.game.board.cells[cellIndex].selectedBy.add(username);

    // reveal cell if ready
    if (this.shouldCellBeRevealed(room, cellIndex)) {
      this.revealCell(room.game, cellIndex);
      out.remaining = room.game.board.remaining;
      out.winner = room.game.winner;
    }

    await this.roomRepository.save(room);

    return out;
  }

  /**
   * Helpers
   */

  private getBoardFromWords(
    words: string[],
    size: number
  ): {
    cells: Cell[];
    firstTurn: Turn.AHint | Turn.BHint;
    remaining: Record<PlayingTeam, number>;
  } {
    const turnCount = Math.floor(size / 3);
    let firstTurn: Turn;
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
      firstTurn = Turn.AHint;
    } else {
      CodenameTypeList.push(CodenameType.TeamB);
      remainingByCategory.set(
        CodenameType.TeamB,
        remainingByCategory.get(CodenameType.TeamB)! + 1
      );
      firstTurn = Turn.BHint;
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
    const cells: Cell[] = [];

    for (let i = 0; i < size; i++) {
      cells.push({
        word: words[i],
        type: shuffledCodenameTypeList[i],
        isRevealed: false,
        selectedBy: new Set(),
      });
    }

    return {
      cells,
      firstTurn,
      remaining: {
        [Team.A]: remainingByCategory.get(CodenameType.TeamA)!,
        [Team.B]: remainingByCategory.get(CodenameType.TeamB)!,
      },
    };
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

  private loadDictionaries(): void {
    const dictionaries: Partial<Record<AvailableLanguages, Dictionary>> = {};
    (Object.values(AvailableLanguages) as AvailableLanguages[]).forEach(
      lang => {
        dictionaries[lang] = this.getLangDictionary(lang);
      }
    );
    this.dictionaries = dictionaries as Record<AvailableLanguages, Dictionary>;
  }

  private revealCell(game: Game, cellIndex: number): void {
    const selectedCell = game.board.cells[cellIndex];
    selectedCell.isRevealed = true;
    const playingTeam = getTeamsTurn(game.currentTurn);

    if (selectedCell.type === CodenameType.Neutral) {
      game.currentTurn = playingTeam === Team.A ? Turn.BHint : Turn.AHint;
      return;
    }

    // Excluded cell revealed => other team wins
    if (selectedCell.type === CodenameType.Excluded) {
      game.winner = playingTeam === Team.A ? Team.B : Team.A;
    }

    // Team cell revealed
    const steppingTeam =
      selectedCell.type === CodenameType.TeamA ? Team.A : Team.B;
    game.board.remaining[steppingTeam]--;

    // If no more remaining from a team => they win
    if (game.board.remaining[steppingTeam] === 0) {
      game.winner = steppingTeam;
    }

    // TODO: define next turn
  }

  private shouldCellBeRevealed(room: Room, cellIndex: number): boolean {
    const { game, teams } = room;
    if (!game) {
      return false;
    }
    const team = getTeamsTurn(game.currentTurn) as Team.A | Team.B;
    return (
      teams[team].players.size === game.board.cells[cellIndex].selectedBy.size
    );
  }
}
