import React, { FC } from 'react';

import { Indicators } from '~/components/Indicators';
// import { Tile } from '~/components/Tile';

import { Container } from './board.styles';

export const Board: FC<{}> = () => {
  return (
    <Container>
      <Indicators />
      <table>
        <tbody>
          {/* {Array(GameStore.ROW_COUNT)
            .fill(null)
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Array(GameStore.COL_COUNT)
                  .fill(null)
                  .map((cell, colIndex) => {
                    counter++;
                    return <Tile key={colIndex} cellIndex={counter} />;
                  })}
              </tr>
            ))} */}
          Board
        </tbody>
      </table>
    </Container>
  );
};
