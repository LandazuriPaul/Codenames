import { Turn } from '~/enums';
import { CodenameState } from './codenameState.interface';

export interface GameState {
  boardState: CodenameState[];
  currentTurn: Turn;
}
