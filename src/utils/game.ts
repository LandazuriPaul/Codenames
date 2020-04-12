import { Theme } from '@material-ui/core/styles';

import { CellStatus, CellType } from '~/domain';

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function shuffleArray(arr: any[]) {
  arr = arr.slice();
  for (let i = arr.length - 1; i >= 1; --i) {
    const j = getRandomInt(0, i + 1);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export function setTileBackground(status: CellStatus, theme: Theme) {
  switch (status) {
    case CellType.Excluded:
      return 'black';
    case CellType.Neutral:
      return theme.palette.grey[500];
    case CellType.TeamA:
      return theme.palette.primary.main;
    case CellType.TeamB:
      return theme.palette.secondary.main;
    case 'hidden':
    default:
      return theme.palette.grey[100];
  }
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export function numericToStringSeed(numericSeed: number) {
  let out = '';
  let seed = numericSeed;
  while (seed > 0) {
    out += ALPHABET[seed % ALPHABET.length];
    seed = Math.floor(seed / ALPHABET.length);
  }
  return out;
}
