import styled from 'styled-components';
import { Button, Theme, Typography } from '@material-ui/core';

export const DirtyLabel = styled(Typography)`
  ${({ theme }: { theme: Theme }) => `
    white-space: nowrap;
    margin-right: ${theme.spacing(3)}px;
    font-style: italic;
    color: ${theme.palette.grey[600]}
  `}
`;

export const FlexBreak = styled.div`
  flex-basis: 100%;
  height: 0;
`;

export const JoinButton = styled(Button)`
  width: 100%;
`;

export const JoinRow = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: ${theme.spacing(3)}px 0;

    &:first-of-type {
      margin-bottom: ${theme.spacing(1)}px;
    }

    &:last-of-type {
      margin-top: ${theme.spacing(1)}px;
    }
  `}
`;

export const Jonction = styled.span`
  ${({ theme }: { theme: Theme }) => `
    color: ${theme.palette.grey[400]};
    margin-top: -20px;
  `}
`;
