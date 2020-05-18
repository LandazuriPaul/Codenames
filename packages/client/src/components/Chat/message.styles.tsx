import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, TypographyProps } from '@material-ui/core';

export const From = styled(({ ...rest }: TypographyProps) => (
  <Typography component="span" {...rest} />
))(({ theme }) => ({
  display: 'inline-block',
  marginRight: theme.spacing(1 / 2),
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: theme.spacing(4),
  flexBasis: 'auto',
  flexGrow: 0,
  flexShrink: 0,
}));

export const MessageContainer = styled('li')({
  display: 'flex',
  alignItems: 'flex-start',
});

export const Text = styled(({ ...rest }: TypographyProps) => (
  <Typography component="span" {...rest} />
))(({ theme }) => ({
  display: 'inline-block',
  flexBasis: 'auto',
  flexGrow: 0,
  textOverflow: 'wrap',
  width: `calc(100% - ${theme.spacing(4.5)})`,
}));

export const TooltipFrom = styled(Typography)({
  fontSize: '1em',
  textAlign: 'right',
});

export const TooltipTime = styled(Typography)({
  fontSize: '0.8em',
  textAlign: 'right',
  fontStyle: 'italic',
});
