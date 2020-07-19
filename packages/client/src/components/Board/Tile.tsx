import React, { FC, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Tooltip, Typography } from '@material-ui/core';

import { Turn } from '@codenames/domain';

import { useHover, useStores } from '~/hooks';

import { CellContainer, PlacedBadge, TilePaper } from './tile.styles';

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
          <Tooltip placement="right" title={printSelectors(cell.selectedBy)}>
            <PlacedBadge
              badgeContent={cell.selectedBy.size}
              color={
                Turn.AGuess === gameStore.currentTurn ? 'primary' : 'secondary'
              }
            />
          </Tooltip>
        )}
      </TilePaper>
    </CellContainer>
  );
});

function printSelectors(usernameSet: Set<string>): ReactNode {
  return (
    <>
      {Array.from(usernameSet).map(username => (
        <Typography key={username} variant="subtitle2">
          {username}
        </Typography>
      ))}
    </>
  );
}
