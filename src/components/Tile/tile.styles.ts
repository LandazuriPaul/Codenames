import styled from 'styled-components';
import { Paper, Theme } from '@material-ui/core';

import { CellStatus, CellType } from '~/domain';
import { setTileBackground } from '~utils';

export const CellContainer = styled.td`
  vertical-align: middle;
  text-align: center;
  width: 20%;
  padding: 1em;
`;

export const TilePaper = styled(Paper)<{ status: CellStatus }>`
  ${({ theme, status }: { theme: Theme; status: CellStatus }) => `
    background: ${setTileBackground(status, theme)};
    color: ${status === CellType.Excluded ? 'white' : 'black'};
    padding: 1em 0;
    cursor: pointer;
  `}
`;
