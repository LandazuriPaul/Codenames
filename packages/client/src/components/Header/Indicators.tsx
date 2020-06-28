import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

import { UserListInfo } from './UserListInfo';

export const Indicators: FC<{}> = () => {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <UserListInfo />
      </Grid>
    </Grid>
  );
};
