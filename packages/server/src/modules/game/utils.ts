/**
 * The maximum is exclusive and the minimum is inclusive
 * @param min
 * @param max
 */
export function getRandomInt(min: number, max: number): number {
  const roundedMin = Math.ceil(min);
  const roundedMax = Math.floor(max);
  return Math.floor(Math.random() * (roundedMax - roundedMin)) + roundedMin;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i >= 1; --i) {
    const j = getRandomInt(0, i + 1);
    const temp = out[i];
    out[i] = out[j];
    out[j] = temp;
  }
  return out;
}

export function getShuffledSizedSlice<T>(arr: T[], size: number): T[] {
  const shuffledArray = shuffleArray(arr);
  return shuffledArray.slice(0, size);
}
