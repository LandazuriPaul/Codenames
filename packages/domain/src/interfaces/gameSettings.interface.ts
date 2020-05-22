import { AvailableLanguages } from '~/enums';

export interface GameSettings {
  boardDimensions: { height: number; width: number };
  language: AvailableLanguages;
  rudeRatio: number;
  teams: { a: string[]; b: string[]; spyA: string; spyB: string };
}
