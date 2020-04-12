import styled from 'styled-components';
import { Paper, Theme, Typography } from '@material-ui/core';
import { darken, lighten } from '@material-ui/core/styles';

export const Title = styled(Typography)`
  width: auto;
` as any;

export const HeaderContainer = styled(Paper)`
  ${({ theme }: { theme: Theme }) => `
  width: calc(100% -  ${theme.spacing(4)}px);
  justify-content: space-between;
  display: flex;
  align-items: center;
  text-align: center;
  height: ${theme.spacing(5)}px;
  padding:  ${theme.spacing(2)}px ${theme.spacing(3)}px;
  background: ${lighten(theme.palette.primary.light, 0.7)};

  h1 {
    color: ${darken(theme.palette.secondary.dark, 0.5)};
  }
  `}
`;
