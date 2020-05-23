/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Theme, Typography, TypographyProps } from '@material-ui/core';

import { TeamColor } from '@codenames/domain';
import { getThemeTeamColor } from '~/styles';

export const Username = styled(
  ({
    isSpyMaster,
    senderColor,
    ...rest
  }: TypographyProps & {
    isSpyMaster: boolean;
    senderColor: TeamColor;
  }) => <Typography component="span" {...rest} />
)(
  ({
    isSpyMaster,
    senderColor,
    theme,
  }: {
    isSpyMaster: boolean;
    senderColor: TeamColor;
    theme: Theme;
  }) => ({
    marginRight: theme.spacing(1.5),
    color: `${getThemeTeamColor(theme, senderColor)}AA`,
    fontSize: '0.75em',
    fontWeight: 'bolder',
    textDecoration: `${isSpyMaster ? 'underline' : 'none'}`,
  })
);

export const MessageContainer = styled('li')(({ theme }) => ({
  margin: `${theme.spacing()}px 0px`,
}));

export const MessageTooltipContainer = styled('div')({
  textAlign: 'right',
});

export const Text = styled((props: TypographyProps) => (
  <Typography component="span" {...props} />
))({
  // fontWeight: 'lighter',
});

export const TooltipTime = styled(Typography)({
  fontSize: '1em',
  fontWeight: 'lighter',
});
