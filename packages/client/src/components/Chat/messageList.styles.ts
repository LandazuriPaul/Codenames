import { styled } from '@material-ui/core/styles';

export const MessageListContainer = styled('div')(({ theme }) => ({
  height: `calc(100% - ${theme.spacing(5)}px)`,
  margin: 0,
  overflowY: 'auto',

  '& > ul': {
    listStyleType: 'none',
    listStylePosition: 'inside',
    margin: 0,
    padding: `0px ${theme.spacing(1 / 2)}px`,
  },
}));
