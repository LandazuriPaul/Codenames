import { Theme, lighten } from '@material-ui/core/styles';

import {
  CellStatus,
  CellType,
  MasterViewCellType,
  UserColor,
  UserTeam,
} from '@codenames/domain';

import { MASTER_VIEW_DIMMING_COEFFICIENT } from '~/config';

export function getTeamColor(team: UserTeam): UserColor {
  switch (team) {
    case UserTeam.TeamA:
      return 'primary';
    case UserTeam.TeamB:
      return 'secondary';
    default:
    case UserTeam.Observer:
      return 'default';
  }
}

export function setTileBackground(status: CellStatus, theme: Theme): string {
  switch (status) {
    case CellType.Excluded:
      return 'black';
    case CellType.Neutral:
      return theme.palette.grey[500];
    case CellType.TeamA:
      return theme.palette.primary.main;
    case CellType.TeamB:
      return theme.palette.secondary.main;
    case MasterViewCellType.MasterViewExcluded:
      return theme.palette.grey[600];
    case MasterViewCellType.MasterViewNeutral:
      return theme.palette.grey[300];
    case MasterViewCellType.MasterViewTeamA:
      return lighten(
        theme.palette.primary.main,
        MASTER_VIEW_DIMMING_COEFFICIENT
      );
    case MasterViewCellType.MasterViewTeamB:
      return lighten(
        theme.palette.secondary.main,
        MASTER_VIEW_DIMMING_COEFFICIENT
      );
    case 'hidden':
    default:
      return theme.palette.grey[100];
  }
}

export function masterView(cellType: CellType): MasterViewCellType {
  switch (cellType) {
    case CellType.Excluded:
      return MasterViewCellType.MasterViewExcluded;
    case CellType.TeamA:
      return MasterViewCellType.MasterViewTeamA;
    case CellType.TeamB:
      return MasterViewCellType.MasterViewTeamB;
    case CellType.Neutral:
    default:
      return MasterViewCellType.MasterViewNeutral;
  }
}
