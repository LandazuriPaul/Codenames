import { TeamMessage } from './teamMessage.interface';
import { Team } from '@codenames/domain';

export interface GeneralMessage extends TeamMessage {
  team: Team;
  isSpyMaster?: true;
}
