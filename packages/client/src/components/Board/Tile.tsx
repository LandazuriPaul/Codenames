import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Badge, Typography } from '@material-ui/core';

import { useHover, useStores } from '~/hooks';

import { CellContainer, TilePaper } from './tile.styles';

interface TileProps {
  index: number;
}

export const Tile: FC<TileProps> = observer(({ index }) => {
  const { gameStore } = useStores();
  const cell = gameStore.board[index];

  const [isHover, onEnter, onLeave] = useHover();

  function handleClick(): void {
    gameStore.onCellClick(index);
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
        {cell.selectedBy.size > 0 && (
          <Badge badgeContent={cell.selectedBy.size} />
        )}
      </TilePaper>
    </CellContainer>
  );
});
