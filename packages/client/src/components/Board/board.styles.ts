import { styled } from '@material-ui/core/styles';

export const Container = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'auto',

  table: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
