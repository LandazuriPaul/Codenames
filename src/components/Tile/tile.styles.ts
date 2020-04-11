import styled from 'styled-components';
import { Paper } from '@material-ui/core';

import { CellStatus, CellType } from '~/domain';

export const CellContainer = styled.td`
  vertical-align: middle;
  text-align: center;
  padding: 1em;
  width: 20%;
`;

export const TilePaper = styled(Paper)<{ status: CellStatus }>`
  background: ${props => {
    switch (props.status) {
      case CellType.Excluded:
        return 'black';
      case CellType.Neutral:
        return 'grey';
      case CellType.TeamA:
        return 'red';
      case CellType.TeamB:
        return 'blue';
      case 'hidden':
      default:
        return 'white';
    }
  }};
  color: ${props => (props.status === CellType.Excluded ? 'white' : 'black')};
  padding: 1em 0;
  cursor: pointer;
`;
