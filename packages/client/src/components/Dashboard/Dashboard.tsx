import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from '@material-ui/core';

import { useStores } from '~/hooks';
import { Board } from '~/components/Board';
import { Chat } from '~/components/Chat';
import { GameForm } from '~/components/GameForm';

import { DashboardContainer } from './dashboard.styles';

export const Dashboard: FC<{}> = observer(() => {
  const { gameStore } = useStores();

  return (
    <DashboardContainer container alignItems="stretch">
      <Grid item md={8} sm={9}>
        {gameStore.board.length > 0 ? <Board /> : <GameForm />}
      </Grid>
      <Grid item md={4} sm={3}>
        <Chat />
      </Grid>
    </DashboardContainer>
  );
});
