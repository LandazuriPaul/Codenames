import { getRandomInt } from './getRandomInt';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shuffleArray(arr: any[]): any[] {
  const out = arr.slice();
  for (let i = out.length - 1; i >= 1; --i) {
    const j = getRandomInt(0, i + 1);
    const temp = out[i];
    out[i] = out[j];
    out[j] = temp;
  }
  return out;
}
