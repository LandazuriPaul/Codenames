import styled from 'styled-components';
import { Button, Paper, Theme, Typography } from '@material-ui/core';
import { darken, lighten } from '@material-ui/core/styles';

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
    cursor: default;
  }
  `}
`;

export const Banner = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export const ExternalButton = styled(Button)`
  ${({ theme }: { theme: Theme }) => `
  margin-top: ${theme.spacing(1)}px;

  a {
    text-decoration: none;
    color: ${theme.palette.grey[500]};
  }

  &:first-of-type {
    margin-left: ${theme.spacing(4)}px;
  }
  `}
`;

export const Title = styled(Typography)`
  width: auto;
` as any;
