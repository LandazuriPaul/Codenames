import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from '@material-ui/core';

import { useHover, useStores } from '~/hooks';
import { Logger } from '~/utils';

import { CellContainer, TilePaper } from './tile.styles';

interface TileProps {
  index: number;
}

export const Tile: FC<TileProps> = observer(({ index }) => {
  const { gameStore } = useStores();
  const cell = gameStore.board[index];

  const [isHover, onEnter, onLeave] = useHover();

  function handleClick(): void {
    Logger.log(`tile ${index} clicked`);
  }

  return (
    <CellContainer>
      <TilePaper
        onClick={handleClick}
        onMouseOver={onEnter}
        onMouseOut={onLeave}
        status={gameStore.getCellStatus(index)}
        elevation={isHover && !cell.isRevealed ? 10 : 2}
      >
        <Typography>{cell.word}</Typography>
      </TilePaper>
    </CellContainer>
  );
});
