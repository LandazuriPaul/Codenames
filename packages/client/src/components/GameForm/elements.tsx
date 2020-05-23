import React, { HTMLProps } from 'react';
import { Typography } from '@material-ui/core';
import { Theme, styled } from '@material-ui/core/styles';

export const HelperText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontSize: '0.9em',
}));

export const SliderWrapper = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ spacing, ...rest }: HTMLProps<HTMLDivElement> & { spacing?: number }) => (
    <div {...rest} />
  )
)(({ spacing = 1, theme }: { spacing?: number; theme: Theme }) => ({
  padding: `0px ${theme.spacing(spacing)}px`,
}));
