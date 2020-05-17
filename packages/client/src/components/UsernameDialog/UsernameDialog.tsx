import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';

import { useStores } from '~/hooks';

export const UsernameDialog: FC<{}> = () => {
  const [username, setUsername] = useState<string>('');
  const { uiStore } = useStores();

  function onUsernameFormSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    uiStore.setUsername(username);
  }

  function handleUsernameChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setUsername(event.target.value);
  }

  return (
    <Dialog open>
      <DialogTitle>Choose a username</DialogTitle>
      <DialogContent>
        <form onSubmit={onUsernameFormSubmit}>
          <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item>
              <TextField
                label="Your name"
                variant="outlined"
                autoFocus
                value={username}
                onChange={handleUsernameChange}
              />
            </Grid>
            <Grid>
              <Button
                disabled={username.length < 2}
                type="submit"
                color="primary"
              >
                Enter the room
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
