import { Team } from '~/enums';

import { RoomTeam } from './roomTeam.interface';

export interface Teams {
  [Team.A]: RoomTeam;
  [Team.B]: RoomTeam;
  [Team.Observer]: RoomTeam;
}
