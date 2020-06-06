import { styled } from '@material-ui/core/styles';

export const LayoutContainer = styled('div')(({ theme }) => ({
  width: '100%',
  flexGrow: 1,
  height: `calc(100vh - ${theme.spacing(16)}px)`,
}));
