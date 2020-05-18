import { styled } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

export const ChatContainer = styled(Paper)(({ theme }) => ({
  height: `calc(100vh - ${theme.spacing(16)}px)`,
  background: theme.palette.grey[300],
  display: 'flex',
  flexDirection: 'column',
}));
