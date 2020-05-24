import { AvailableLanguages } from '~/enums';

export interface BoardSettings {
  height: number;
  width: number;
  language: AvailableLanguages;
  rudeRatio: number;
}
