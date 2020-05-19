import { styled } from '@material-ui/core/styles';
import { Paper, Tabs } from '@material-ui/core';

export const ChatContainer = styled(Paper)(({ theme }) => ({
  height: `calc(100vh - ${theme.spacing(16)}px)`,
  background: theme.palette.grey[300],
  display: 'flex',
  flexDirection: 'column',

  '& .MuiTab-root, & .MuiTabs-root': {
    minHeight: theme.spacing(3),
  },

  '& .MuiTab-textColorInherit': {
    opacity: 0.3,
  },
  '& .MuiTab-textColorInherit.Mui-selected': {
    opacity: 1,
  },

  [theme.breakpoints.up('sm')]: {
    '& .MuiTab-root': {
      minWidth: 'unset',
    },
  },
}));

export const ChatTabs = styled(Tabs)(({ theme }) => ({
  background: theme.palette.grey[200],
}));
