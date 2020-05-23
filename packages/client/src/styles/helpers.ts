import { Theme } from '@material-ui/core';

import { TeamColor } from '@codenames/domain';

export function getThemeTeamColor(theme: Theme, teamColor: TeamColor): string {
  return teamColor === 'default'
    ? theme.palette.grey[700]
    : theme.palette[teamColor].main;
}
