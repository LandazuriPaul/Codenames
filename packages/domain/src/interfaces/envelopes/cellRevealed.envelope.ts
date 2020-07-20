import { Turn } from '~/enums';
import { PlayingTeam } from '~/types';

export interface CellRevealedEnvelope {
  cellIndex: number;
  nextTurn: Turn;
  remaining: Record<PlayingTeam, number>;
}
