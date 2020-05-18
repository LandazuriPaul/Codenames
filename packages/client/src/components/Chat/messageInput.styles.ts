import { styled } from '@material-ui/core/styles';
import { Paper, TextField } from '@material-ui/core';

export const MessageInputContainer = styled(Paper)(({ theme }) => ({
  padding: 0,
  margin: 0,
  flexGrow: 2,
  background: theme.palette.grey[200],
}));

export const MessageInputField = styled(TextField)(({ theme }) => ({
  padding: 0,
  width: `calc(100% - ${theme.spacing(2)}px)`,

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
