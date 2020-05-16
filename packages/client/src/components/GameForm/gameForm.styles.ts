import { lighten, styled } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

export const Container = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const MainForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: lighten(theme.palette.secondary.light, 0.5),
}));

export const NewGame = styled(Typography)({
  a: {
    cursor: 'pointer',
  },
});
