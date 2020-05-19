import { UserTeam } from '~/enums';
import { TeamChatMessage } from './teamChat.message';

export interface GlobalChatMessage extends TeamChatMessage {
  isSpyMaster?: boolean;
  team: UserTeam;
}
