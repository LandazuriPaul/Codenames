import { styled } from '@material-ui/core/styles';

export const Container = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Or = styled('div')(({ theme }) => ({
  position: 'relative',
  textTransform: 'uppercase',
  textAlign: 'center',
  width: '100%',
  color: theme.palette.grey[400],
  marginBottom: theme.spacing(),

  '&:before': {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 10,
    background: theme.palette.primary.main,
    content: '',
    width: '30%',
    display: 'block',
  },

  '&:after': {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 10,
    background: theme.palette.primary.main,
    content: '',
    width: '30%',
    display: 'block',
  },
}));
