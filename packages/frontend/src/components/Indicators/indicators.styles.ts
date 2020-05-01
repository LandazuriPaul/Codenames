import styled from 'styled-components';
import { Theme, Typography } from '@material-ui/core';

export const IndicatorsContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: ${theme.spacing()}px;
  `}
`;

export const TeamCount = styled(Typography)`
  font-weight: bold;
  font-size: 1.1em;
`;

export const Versus = styled(Typography)`
  ${({ theme }: { theme: Theme }) => `
    color: ${theme.palette.grey[500]}
  `}
`;
