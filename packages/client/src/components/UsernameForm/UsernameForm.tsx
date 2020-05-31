import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useStores } from '~/hooks';
import { connect } from '~/queries';
import { Logger } from '~/utils';

import { UsernameFormContainer } from './usernameForm.styles';

interface UsernameFormProps {
  roomId: string;
}

export const UsernameForm: FC<UsernameFormProps> = ({ roomId }) => {
  const { uiStore } = useStores();
  const [username, setUsername] = useState<string>(uiStore.username || '');
  const { enqueueSnackbar } = useSnackbar();
  const [getAccessToken, { status }] = useMutation(connect, {
    throwOnError: true,
  });

  async function connectToRoom(): Promise<void> {
    try {
      const { accessToken } = await getAccessToken({ roomId, username });
      uiStore.setToken(accessToken);
      uiStore.setUsername(username);
      enqueueSnackbar(`Hey ${username}, welcome to the room ${roomId}!`, {
        variant: 'success',
      });
    } catch (err) {
      Logger.log(err);
      let message = 'An unknown error occurred.';
      let variant: 'warning' | 'error' = 'warning';
      if (err.response && err.response.status === 409) {
        Logger.log(err.response);
        message = err.response.data?.message || message;
        variant = 'error';
      }
      enqueueSnackbar(message, { variant });
    }
  }

  async function onUsernameFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    await connectToRoom();
  }

  function handleUsernameChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setUsername(event.target.value);
  }

  return (
    <Dialog open>
      <DialogContent>
        <Typography align="center" variant="h6" component="h4">
          Choose a username
        </Typography>
        <UsernameFormContainer>
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
              <Grid item>
                <Button
                  disabled={username.length < 2 || status === 'loading'}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Enter the room&nbsp;
                  {status === 'loading' && <CircularProgress size="1.5em" />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </UsernameFormContainer>
      </DialogContent>
    </Dialog>
  );
};
