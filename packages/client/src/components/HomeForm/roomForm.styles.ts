import { styled } from '@material-ui/core/styles';

export const RoomFormContainer = styled('form')(({ theme }) => ({
  margin: `${theme.spacing(2)}px 0`,
  width: '80%',
  maxWidth: '300px',

  '& > div, & > button': {
    width: '100%',
    marginTop: theme.spacing(),
  },
}));
