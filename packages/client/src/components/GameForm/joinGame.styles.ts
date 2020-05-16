import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const FlexBreak = styled('div')({
  flexBasis: '100%',
  height: 0,
});

export const JoinButton = styled(Button)({
  width: '100%',
});

export const JoinRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  margin: `${theme.spacing(3)}px 0`,

  '&:first-of-type': {
    marginBottom: theme.spacing(1),
  },

  '&:last-of-type': {
    marginTop: theme.spacing(1),
  },
}));

export const Jonction = styled('span')(({ theme }) => ({
  marginTop: '-20px',
  color: theme.palette.grey[400],
}));
