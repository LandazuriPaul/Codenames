import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { FormControlLabel, Switch } from '@material-ui/core';

import { useStores } from '~/hooks';

export const MasterSwitch: FC<{}> = observer(() => {
  const { gameStore } = useStores();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={gameStore.isSpyMaster}
          disabled={gameStore.isSpyMaster}
          color="secondary"
        />
      }
      label="Master mode"
    />
  );
});
