import { styled } from '@material-ui/core/styles';

export const CreateForm = styled('form')(({ theme }) => ({
  margin: `${theme.spacing(2)}px 0`,

  '& > div, & > button': {
    width: '100%',
    marginTop: theme.spacing(),
  },
}));
