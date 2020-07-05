import { Theme, lighten } from '@material-ui/core/styles';

import {
  CodenameStatus,
  CodenameType,
  MasterViewCodenameType,
  Team,
  TeamColor,
} from '@codenames/domain';

import { MASTER_VIEW_DIMMING_COEFFICIENT } from '~/config';

export function getTeamColor(team: Team): TeamColor {
  switch (team) {
    case Team.A:
      return 'primary';
    case Team.B:
      return 'secondary';
    default:
    case Team.Observer:
      return 'default';
  }
}

export function setTileBackground(
  status: CodenameStatus,
  theme: Theme
): string {
  switch (status) {
    case CodenameType.Excluded:
      return 'black';
    case CodenameType.Neutral:
      return theme.palette.grey[500];
    case CodenameType.TeamA:
      return theme.palette.primary.main;
    case CodenameType.TeamB:
      return theme.palette.secondary.main;
    case MasterViewCodenameType.MasterViewExcluded:
      return theme.palette.grey[600];
    case MasterViewCodenameType.MasterViewNeutral:
      return theme.palette.grey[300];
    case MasterViewCodenameType.MasterViewTeamA:
      return lighten(
        theme.palette.primary.main,
        MASTER_VIEW_DIMMING_COEFFICIENT
      );
    case MasterViewCodenameType.MasterViewTeamB:
      return lighten(
        theme.palette.secondary.main,
        MASTER_VIEW_DIMMING_COEFFICIENT
      );
    case 'hidden':
    default:
      return theme.palette.grey[100];
  }
}

export function masterView(codenameType: CodenameType): MasterViewCodenameType {
  switch (codenameType) {
    case CodenameType.Excluded:
      return MasterViewCodenameType.MasterViewExcluded;
    case CodenameType.TeamA:
      return MasterViewCodenameType.MasterViewTeamA;
    case CodenameType.TeamB:
      return MasterViewCodenameType.MasterViewTeamB;
    case CodenameType.Neutral:
    default:
      return MasterViewCodenameType.MasterViewNeutral;
  }
}
