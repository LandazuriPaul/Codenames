import React from 'react';
import { styled } from '@material-ui/core/styles';

export const MessageListContainer = styled(({ forwardRef, ...rest }) => (
  <div ref={forwardRef} {...rest} />
))(({ theme }) => ({
  height: '100%',
  margin: 0,
  overflowY: 'auto',

  '& > ul': {
    listStyleType: 'none',
    listStylePosition: 'inside',
    margin: 0,
    padding: `0px ${theme.spacing(1 / 2)}px`,
  },
}));
