import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Paper, TextField, TextFieldProps, Theme } from '@material-ui/core';

import { TeamColor } from '@codenames/domain';

import { getThemeTeamColor } from '~/styles';

export const MessageInputProps = { style: { overflow: 'auto' } };

export const MessageInputContainer = styled(Paper)(({ theme }) => ({
  padding: 0,
  margin: 0,
  flexGrow: 2,
  background: theme.palette.grey[200],
}));

type MessageInputFieldProps = TextFieldProps & {
  userColor: TeamColor;
};

export const MessageInputField = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ userColor, ...rest }: MessageInputFieldProps) => <TextField {...rest} />
)(({ theme, userColor }: { theme: Theme; userColor: TeamColor }) => ({
  padding: 0,
  width: `calc(100% - ${theme.spacing(2)}px)`,

  '& > .MuiInput-underline:after': {
    borderBottomColor: getThemeTeamColor(theme, userColor),
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
