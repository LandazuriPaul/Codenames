import styled from 'styled-components';
import { AppBar, IconButton, Theme, Typography } from '@material-ui/core';
import { darken, lighten } from '@material-ui/core/styles';

export const HeaderContainer = styled(AppBar)`
  ${({ theme }: { theme: Theme }) => `
    background: ${lighten(theme.palette.primary.light, 0.5)};
    color: inherit;
  `}
`;

export const MobileMenu = styled(IconButton)`
  ${({ theme }: { theme: Theme }) => `
    color: ${darken(theme.palette.secondary.dark, 0.5)};
  `}
`;

export const Title = styled(Typography)`
  ${({ theme }: { theme: Theme }) => `
    width: auto;
    color: ${darken(theme.palette.secondary.dark, 0.5)};
  `}
` as any;
