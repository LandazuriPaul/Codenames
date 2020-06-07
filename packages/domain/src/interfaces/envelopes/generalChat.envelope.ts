import { Team } from '~/enums';

import { TeamChatEnvelope } from './teamChat.envelope';

export interface GeneralChatEnvelope extends TeamChatEnvelope {
  isSpyMaster?: true;
  team: Team;
}
