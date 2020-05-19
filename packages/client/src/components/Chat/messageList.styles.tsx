import React from 'react';
import { Theme } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const MessageListContainer = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ defaultDisplay, forwardRef, ...rest }) => (
    <div ref={forwardRef} {...rest} />
  )
)(({ defaultDisplay, theme }: { defaultDisplay: boolean; theme: Theme }) => ({
  display: `${defaultDisplay ? 'block' : 'none'}`,
  height: `calc(100% - ${theme.spacing(5)}px)`,
  margin: 0,
  overflowY: 'auto',

  '& > ul': {
    listStyleType: 'none',
    listStylePosition: 'inside',
    margin: 0,
    padding: `0px ${theme.spacing(1 / 2)}px`,
  },
}));
