import { getRandomInt } from './getRandomInt';
import { numericToString } from './numericToString';

export function getRandomUppercaseString(): string {
  const n = getRandomInt(0, 1e9);
  return numericToString(n).toUpperCase();
}
