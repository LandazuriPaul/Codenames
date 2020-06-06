import { styled } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

export const Body = styled(Grid)(({ theme }) => ({
  height: '100%',
  overflowY: 'auto',
  padding: theme.spacing(2),
}));

export const ChatContainer = styled(Grid)({
  height: '100%',
});

export const DashboardContainer = styled(Grid)({
  height: '100%',
});
