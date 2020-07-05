import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from '@material-ui/core';

import { useHover, useStores } from '~/hooks';
import { Logger } from '~/utils';

import { CodenameContainer, TilePaper } from './tile.styles';

interface TileProps {
  index: number;
}

export const Tile: FC<TileProps> = observer(({ index }) => {
  const { gameStore } = useStores();
  const codename = gameStore.board[index];

  const [isHover, onEnter, onLeave] = useHover();

  function handleClick(): void {
    Logger.log(`tile ${index} clicked`);
  }

  return (
    <CodenameContainer>
      <TilePaper
        onClick={handleClick}
        onMouseOver={onEnter}
        onMouseOut={onLeave}
        status={gameStore.getCodenameStatus(index)}
        elevation={isHover && !codename.isRevealed ? 10 : 2}
      >
        <Typography>{codename.word}</Typography>
      </TilePaper>
    </CodenameContainer>
  );
});
