import React from 'react';
import { styled } from '@material-ui/core/styles';
import {
  IconButton,
  IconButtonProps,
  Theme,
  Typography,
} from '@material-ui/core';

export const IndicatorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(),
  padding: `0px ${theme.spacing(2)}px`,
}));

export const TeamIndicatorContainer = styled('div')({
  width: '100%',
});

export const TeamIndicator = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isReversed, ...rest }: { isReversed?: boolean }) => <div {...rest} />
)(({ isReversed, theme }: { isReversed?: boolean; theme: Theme }) => ({
  display: 'flex',
  flexDirection: isReversed ? 'row-reverse' : 'row',
  alignItems: 'center',
  position: 'relative',
  height: theme.spacing(8),
  width: '100%',

  '& > div': {
    width: '100%',
    margin: 0,
    marginLeft: isReversed ? 0 : theme.spacing(6),
    marginRight: isReversed ? theme.spacing(6) : 0,
    transform: isReversed ? 'scaleX(-1)' : 'none',
  },

  '& p': {
    color: theme.palette.primary.contrastText,
    position: 'absolute',
    background: isReversed
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
  },
}));

export const TeamCount = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  borderRadius: '50%',
  height: theme.spacing(6),
  width: theme.spacing(6),
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: `${theme.spacing(6)}px`,
}));

export const TurnIndicator = styled(
  ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    turnColor,
    ...rest
  }: { turnColor: 'primary' | 'secondary' } & IconButtonProps) => (
    <IconButton {...rest} />
  )
)(
  ({
    theme,
    turnColor,
  }: {
    theme: Theme;
    turnColor: 'primary' | 'secondary';
  }) => ({
    padding: theme.spacing(2.5),
    color: `${theme.palette.primary.contrastText} !important`,
    background: `${theme.palette[turnColor].light}77 !important`,
  })
);
