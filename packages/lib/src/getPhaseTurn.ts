import { Turn } from '@codenames/domain';

export function getPhaseTurn(currentTurn: Turn): 'hint' | 'guess' {
  if (currentTurn === Turn.AGuess || currentTurn === Turn.BGuess) {
    return 'guess';
  }
  return 'hint';
}
