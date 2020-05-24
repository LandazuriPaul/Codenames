/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { styled } from '@material-ui/core/styles';
import {
  CardHeader,
  CardHeaderProps,
  List,
  ListProps,
  Theme,
  Typography,
} from '@material-ui/core';

import { TeamColor } from '@codenames/domain';

import { getThemeTeamColor } from '~/styles';

export const ColumnHeader = styled(
  ({ teamColor, ...rest }: CardHeaderProps & { teamColor: TeamColor }) => (
    <CardHeader {...rest} />
  )
)(({ teamColor, theme }: { teamColor: TeamColor; theme: Theme }) => ({
  background: getThemeTeamColor(theme, teamColor),
  color: theme.palette.grey[200],
}));

export const ColumnTitle = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Instructions = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ListContainer = styled(
  ({ teamColor, ...rest }: ListProps & { teamColor: TeamColor }) => (
    <List {...rest} />
  )
)(({ teamColor, theme }: { teamColor: TeamColor; theme: Theme }) => ({
  background: `${getThemeTeamColor(theme, teamColor)}30`,
  color: theme.palette.grey[800],
  height: theme.spacing(30),
  overflowY: 'auto',
}));

export const UserText = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '80%',
});
