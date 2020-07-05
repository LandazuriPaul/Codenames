import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { useStores } from '~/hooks';

import { Indicators } from './Indicators';
import { Tile } from './Tile';

import { Container } from './board.styles';

export const Board: FC<{}> = observer(() => {
  const {
    gameStore: { boardHeight, boardWidth },
  } = useStores();
  let counter = -1;

  return (
    <Container>
      <Indicators />
      <table>
        <tbody>
          <tr>
            <td>Board</td>
          </tr>
          {Array(boardHeight)
            .fill(null)
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Array(boardWidth)
                  .fill(null)
                  .map((cell, colIndex) => {
                    counter++;
                    return <Tile key={colIndex} index={counter} />;
                  })}
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
});
