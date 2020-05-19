import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Theme, Typography, TypographyProps } from '@material-ui/core';

import { UserColor } from '@codenames/domain';

export const Username = styled(
  ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    senderColour,
    ...rest
  }: TypographyProps & { senderColour: UserColor }) => (
    <Typography component="span" {...rest} />
  )
)(({ theme, senderColour }: { theme: Theme; senderColour: UserColor }) => ({
  marginRight: theme.spacing(1 / 2),
  fontWeight: 'lighter',
  color: `${
    senderColour === 'default'
      ? theme.palette.grey[600]
      : theme.palette[senderColour].main
  }`,
}));

export const MessageContainer = styled('li')(({ theme }) => ({
  margin: `${theme.spacing(1 / 2)}px 0px`,
}));

export const TooltipTime = styled(Typography)({
  fontSize: '0.9em',
  textAlign: 'right',
  fontWeight: 'lighter',
});
