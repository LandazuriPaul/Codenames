import { darken, lighten, styled } from '@material-ui/core/styles';
import { AppBar, IconButton, Typography } from '@material-ui/core';

export const HeaderContainer = styled(AppBar)(({ theme }) => ({
  background: lighten(theme.palette.primary.light, 0.5),
  color: 'inherit',
}));

export const MobileMenu = styled(IconButton)(({ theme }) => ({
  color: darken(theme.palette.secondary.dark, 0.5),
}));

export const Title = styled(Typography)(({ theme }) => ({
  width: 'auto',
  color: darken(theme.palette.secondary.dark, 0.5),
  cursor: 'pointer',
})) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
