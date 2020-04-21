import styled from 'styled-components';
import { Paper, Theme } from '@material-ui/core';

import { CellStatus } from '~/domain';
import { setTileBackground } from '~/utils';

export const CellContainer = styled.td`
  ${({ theme }: { theme: Theme }) => `
    vertical-align: middle;
    text-align: center;
    width: 20%;
    padding: ${theme.spacing(2)}px;

    ${theme.breakpoints.down('sm')} {
      padding: ${theme.spacing(1)}px;
    }
  `}
`;

export const TilePaper = styled(Paper)<{ status: CellStatus }>`
  ${({ theme, status }: { theme: Theme; status: CellStatus }) => `
    background: ${setTileBackground(status, theme)};
    color: ${status === 'hidden' ? 'black' : 'white'};
    padding: ${theme.spacing(2)}px 0;
    cursor: pointer;

    ${theme.breakpoints.down('sm')} {
      padding: ${theme.spacing(1 / 2)}px;
    }
  `}
`;
