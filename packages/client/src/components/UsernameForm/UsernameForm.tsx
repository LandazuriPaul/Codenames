import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { useStores } from '~/hooks';
import { connect } from '~/queries';
import { Logger } from '~/utils';

import { UsernameFormContainer } from './usernameForm.styles';

interface UsernameFormProps {
  roomId: string;
}

export const UsernameForm: FC<UsernameFormProps> = ({ roomId }) => {
  const { uiStore, websocketStore } = useStores();
  const [username, setUsername] = useState<string>(uiStore.username || '');
  const { enqueueSnackbar } = useSnackbar();
  const [getAccessToken, { status }] = useMutation(connect, {
    throwOnError: true,
  });

  async function connectToRoom(): Promise<void> {
    try {
      const { accessToken } = await getAccessToken({ roomId, username });
      uiStore.setUsername(username);
      websocketStore.setToken(accessToken);
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
    <SizedPaper elevation={0}>
      <SizedGrid
        container
        justify="center"
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Typography align="center" variant="h6" component="h4">
            Choose a username
          </Typography>
        </Grid>
        <Grid item>
          <UsernameFormContainer>
            <form onSubmit={onUsernameFormSubmit}>
              <Grid
                container
                direction="column"
                spacing={2}
                alignItems="center"
              >
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
        </Grid>
      </SizedGrid>
    </SizedPaper>
  );
};

const SizedPaper = styled(Paper)({
  height: '100%',
});

const SizedGrid = styled(Grid)({
  height: '100%',
});
