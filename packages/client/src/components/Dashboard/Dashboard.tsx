import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

import { Board } from '~/components/Board';
import { Chat } from '~/components/Chat';

import { DashboardContainer } from './dashboard.styles';

export const Dashboard: FC<{}> = () => {
  return (
    <DashboardContainer container alignItems="stretch">
      <Grid item sm={9}>
        <Board />
      </Grid>
      <Grid item sm={3}>
        <Chat />
      </Grid>
    </DashboardContainer>
  );
};
