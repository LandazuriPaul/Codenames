import { styled } from '@material-ui/core/styles';

export const MessageListContainer = styled('div')(({ theme }) => ({
  height: `calc(100% - ${theme.spacing(5)}px)`,
  margin: 0,
  overflowY: 'auto',

  '& > ul': {
    margin: 0,
  },
}));
