import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import { useStores } from '~/hooks';

export const MasterSwitch: FC<{}> = observer(() => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const { gameStore } = useStores();

  function handleClose() {
    setIsConfirmModalOpen(false);
  }

  function openConfirmModal() {
    setIsConfirmModalOpen(true);
  }

  function enableMasterMode() {
    gameStore.enableMasterMode();
    handleClose();
  }

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={gameStore.isMasterMode}
            disabled={gameStore.isMasterMode}
            onChange={openConfirmModal}
            color="secondary"
          />
        }
        label="Master mode"
      />
      <Dialog open={isConfirmModalOpen} onClose={handleClose}>
        <DialogTitle>Enable Master mode?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you enable the Master mode, you will reveal all codenames and
            won&apos;t be able to play as guessers for this game.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            autoFocus
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={enableMasterMode} color="primary">
            Enter Master mode
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
