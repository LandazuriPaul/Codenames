import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@material-ui/core';

import { CellType } from '~/domain';
import { useStores } from '~/hooks';

import { IndicatorsContainer, TeamCount, Versus } from './indicators.styles';

export const Indicators: FC<{}> = observer(() => {
  const [isEndModalOpen, setIsEndModalOpen] = useState<boolean>(false);
  const { gameStore } = useStores();

  useEffect(() => {
    if (gameStore.winnerTeam) {
      setIsEndModalOpen(true);
    }
  }, [gameStore.winnerTeam]);

  function handleClose() {
    setIsEndModalOpen(false);
  }

  return (
    <>
      <IndicatorsContainer>
        <TeamCount variant="body1" color="primary">
          {gameStore.remainingTeamACount} remaining
        </TeamCount>
        <Versus>&nbsp;VS&nbsp;</Versus>
        <TeamCount variant="body1" color="secondary">
          {gameStore.remainingTeamBCount} remaining
        </TeamCount>
      </IndicatorsContainer>
      <Dialog open={isEndModalOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            <Typography
              color={
                gameStore.winnerTeam === CellType.TeamA
                  ? 'primary'
                  : 'secondary'
              }
              component="span"
            >
              {gameStore.winnerTeam === CellType.TeamA ? 'Team A' : 'Team B'}
            </Typography>
            &nbsp;wins!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color={
              gameStore.winnerTeam === CellType.TeamA ? 'primary' : 'secondary'
            }
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
