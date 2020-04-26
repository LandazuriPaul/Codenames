import { Theme, lighten } from '@material-ui/core/styles';

import { MASTER_VIEW_DIMMING_COEFFICIENT } from '~/config';
import { CellStatus, CellType, MasterViewCellType } from '~/domain';

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function shuffleArray(arr: any[]): any[] {
  arr = arr.slice();
  for (let i = arr.length - 1; i >= 1; --i) {
    const j = getRandomInt(0, i + 1);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export function setTileBackground(status: CellStatus, theme: Theme): string {
  switch (status) {
    case CellType.Excluded:
      return 'black';
    case CellType.Neutral:
      return theme.palette.grey[500];
    case CellType.TeamA:
      return theme.palette.primary.main;
    case CellType.TeamB:
      return theme.palette.secondary.main;
    case MasterViewCellType.MasterViewExcluded:
      return theme.palette.grey[600];
    case MasterViewCellType.MasterViewNeutral:
      return theme.palette.grey[300];
    case MasterViewCellType.MasterViewTeamA:
      return lighten(
        theme.palette.primary.main,
        MASTER_VIEW_DIMMING_COEFFICIENT
      );
    case MasterViewCellType.MasterViewTeamB:
      return lighten(
        theme.palette.secondary.main,
        MASTER_VIEW_DIMMING_COEFFICIENT
      );
    case 'hidden':
    default:
      return theme.palette.grey[100];
  }
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export function numericToStringSeed(numericSeed: number): string {
  let out = '';
  let seed = numericSeed;
  while (seed > 0) {
    out += ALPHABET[seed % ALPHABET.length];
    seed = Math.floor(seed / ALPHABET.length);
  }
  return out;
}

export function masterView(cellType: CellType): MasterViewCellType {
  switch (cellType) {
    case CellType.Excluded:
      return MasterViewCellType.MasterViewExcluded;
    case CellType.TeamA:
      return MasterViewCellType.MasterViewTeamA;
    case CellType.TeamB:
      return MasterViewCellType.MasterViewTeamB;
    case CellType.Neutral:
    default:
      return MasterViewCellType.MasterViewNeutral;
  }
}
