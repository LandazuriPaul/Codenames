import styled from 'styled-components';
import { Paper, Theme, Typography } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainForm = styled(Paper)`
  ${({ theme }: { theme: Theme }) => `
    padding: ${theme.spacing(2)}px;
    background: ${lighten(theme.palette.secondary.light, 0.5)};
  `}
`;

export const NewGame = styled(Typography)`
  a {
    cursor: pointer;
  }
`;
