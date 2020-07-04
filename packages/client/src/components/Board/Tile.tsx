import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from '@material-ui/core';

import { useHover, useStores } from '~/hooks';
import { Logger } from '~/utils';

import { CellContainer, TilePaper } from './tile.styles';

interface TileProps {
  cellIndex: number;
}

export const Tile: FC<TileProps> = observer(({ cellIndex }) => {
  const { gameStore } = useStores();
  const cell = gameStore.board[cellIndex];

  const [isHover, onEnter, onLeave] = useHover();

  function handleClick(): void {
    Logger.log(`tile ${cellIndex} clicked`);
  }

  return (
    <CellContainer>
      <TilePaper
        onClick={handleClick}
        onMouseOver={onEnter}
        onMouseOut={onLeave}
        status={gameStore.getCellStatus(cellIndex)}
        elevation={isHover && !cell.isRevealed ? 10 : 2}
      >
        <Typography>{cell.word}</Typography>
      </TilePaper>
    </CellContainer>
  );
});
