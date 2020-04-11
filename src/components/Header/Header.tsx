import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';

import { useStores } from '~hooks';

export const Header: FC<{}> = observer(() => {
  const { gameStore } = useStores();

  return (
    <header>
      <Typography component="h1">Codenames</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={gameStore.isMasterMode}
            onChange={() => gameStore.toggleMasterMode()}
            color="primary"
          />
        }
        label="Master mode"
      />
    </header>
  );
});
