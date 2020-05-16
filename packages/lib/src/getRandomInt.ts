// The maximum is exclusive and the minimum is inclusive
export function getRandomInt(min: number, max: number): number {
  const intervalMin = Math.ceil(min);
  const intervalMax = Math.floor(max);
  return Math.floor(Math.random() * (intervalMax - intervalMin)) + min;
}
