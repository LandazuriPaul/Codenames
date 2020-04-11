import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { useStores } from '~hooks';

import { CellContainer, TilePaper } from './tile.styles';
import { Typography } from '@material-ui/core';

interface TileProps {
  cellIndex: number;
}

export const Tile: FC<TileProps> = observer(({ cellIndex }) => {
  const { gameStore } = useStores();
  const cell = gameStore.board[cellIndex];

  function handleClick() {
    gameStore.toggelRevealCell(cellIndex);
  }

  return (
    <CellContainer>
      <TilePaper
        onClick={handleClick}
        status={gameStore.getCellStatus(cellIndex)}
      >
        <Typography>{cell.word}</Typography>
      </TilePaper>
    </CellContainer>
  );
});
