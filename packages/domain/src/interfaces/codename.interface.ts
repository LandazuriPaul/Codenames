import { CodenameType } from '~/enums';

export interface Codename {
  isRevealed: boolean;
  isSelected: boolean;
  type: CodenameType;
  word: string;
}
