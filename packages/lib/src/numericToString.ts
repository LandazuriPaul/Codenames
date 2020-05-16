const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export function numericToString(n: number): string {
  let out = '';
  let seed = n;
  while (seed > 0) {
    out += ALPHABET[seed % ALPHABET.length];
    seed = Math.floor(seed / ALPHABET.length);
  }
  return out;
}
