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
