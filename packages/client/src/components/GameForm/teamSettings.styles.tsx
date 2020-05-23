import React from 'react';
import { styled } from '@material-ui/core/styles';
import {
  CardHeader,
  CardHeaderProps,
  List,
  ListProps,
  Theme,
} from '@material-ui/core';

import { TeamColor } from '@codenames/domain';

import { getThemeTeamColor } from '~/styles';

export const ColumnHeader = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ teamColor, ...rest }: CardHeaderProps & { teamColor: TeamColor }) => (
    <CardHeader {...rest} />
  )
)(({ teamColor, theme }: { teamColor: TeamColor; theme: Theme }) => ({
  background: getThemeTeamColor(theme, teamColor),
  color: theme.palette.grey[200],
}));

export const ListContainer = styled(
  ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    teamColor,
    ...rest
  }: ListProps & { teamColor: TeamColor }) => <List {...rest} />
)(({ teamColor, theme }: { teamColor: TeamColor; theme: Theme }) => ({
  background: `${getThemeTeamColor(theme, teamColor)}77`,
  color: theme.palette.grey[800],
  height: theme.spacing(30),
  overflowY: 'auto',
}));
