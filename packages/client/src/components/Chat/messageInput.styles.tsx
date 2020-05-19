import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Paper, TextField, TextFieldProps, Theme } from '@material-ui/core';

import { UserColor } from '@codenames/domain';

export const MessageInputProps = { style: { overflow: 'auto' } };

export const MessageInputContainer = styled(Paper)(({ theme }) => ({
  padding: 0,
  margin: 0,
  flexGrow: 2,
  background: theme.palette.grey[200],
}));

type MessageInputFieldProps = TextFieldProps & {
  userColor: UserColor;
};

export const MessageInputField = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ userColor, ...rest }: MessageInputFieldProps) => <TextField {...rest} />
)(({ theme, userColor }: { theme: Theme; userColor: UserColor }) => ({
  padding: 0,
  width: `calc(100% - ${theme.spacing(2)}px)`,

  '& > .MuiInput-underline:after': {
    borderBottomColor: `${
      userColor === 'default'
        ? theme.palette.grey[700]
        : theme.palette[userColor].main
    }`,
  },

  '& textarea': {
    maxHeight: theme.spacing(8),
    overflowY: 'auto',
  },
}));

export const MessageInputForm = styled('form')(({ theme }) => ({
  display: 'flex',
  width: `calc(100% - ${theme.spacing(2)}px)`,
  padding: theme.spacing(1),
}));
