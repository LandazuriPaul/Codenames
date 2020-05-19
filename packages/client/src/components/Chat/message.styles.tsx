/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Theme, Typography, TypographyProps } from '@material-ui/core';

import { UserColor } from '@codenames/domain';

export const Username = styled(
  ({
    isSpyMaster,
    senderColour,
    ...rest
  }: TypographyProps & {
    isSpyMaster: boolean;
    senderColour: UserColor;
  }) => <Typography component="span" {...rest} />
)(
  ({
    isSpyMaster,
    senderColour,
    theme,
  }: {
    isSpyMaster: boolean;
    senderColour: UserColor;
    theme: Theme;
  }) => ({
    marginRight: theme.spacing(1 / 2),
    fontWeight: 'lighter',
    color: `${
      senderColour === 'default'
        ? theme.palette.grey[600]
        : theme.palette[senderColour].main
    }`,
    textDecoration: `${isSpyMaster ? 'underline' : 'none'}`,
  })
);

export const MessageContainer = styled('li')(({ theme }) => ({
  margin: `${theme.spacing(1 / 2)}px 0px`,
}));

export const MessageTooltipContainer = styled('div')({
  textAlign: 'right',
});

export const TooltipTime = styled(Typography)({
  fontSize: '1em',
  fontWeight: 'lighter',
});
