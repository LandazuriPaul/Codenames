import React, { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Autorenew, ChevronRight } from '@material-ui/icons';

import { cleanRoomIdFromInput, getRandomUppercaseString } from '@codenames/lib';

import { CreateForm } from './createRoom.styles';

export const CreateRoom: FC<{}> = () => {
  const [newRoomId, setNewRoomId] = useState<string>(
    getRandomUppercaseString()
  );
  const history = useHistory();

  function handleRoomIdChange(event: ChangeEvent<HTMLInputElement>): void {
    const roomId = cleanRoomIdFromInput(event.target.value);
    setNewRoomId(roomId);
  }

  function handleReset(): void {
    setNewRoomId(getRandomUppercaseString());
  }

  function onCreateSubmit(
    event: MouseEvent<HTMLAnchorElement, MouseEvent> | FormEvent
  ): void {
    event.preventDefault();
    if (newRoomId.length < 3) {
      return;
    }
    history.push(`/${newRoomId}`);
  }

  return (
    <>
      <Typography
        align="center"
        variant="h4"
        component="h4"
        color="textSecondary"
      >
        Create a room
      </Typography>
      <CreateForm noValidate autoComplete="off" onSubmit={onCreateSubmit}>
        <TextField
          label="Room ID"
          variant="outlined"
          autoFocus
          value={newRoomId}
          onChange={handleRoomIdChange}
          error={newRoomId.length < 3}
          helperText={
            newRoomId.length < 3 ? (
              <Tooltip title="The room id has to be at least 3 characters long">
                <Typography variant="caption">Invalid room id</Typography>
              </Tooltip>
            ) : null
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Generate new seed">
                  <IconButton size="small" onClick={handleReset}>
                    <Autorenew fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          disabled={newRoomId.length < 3}
          color="secondary"
          onClick={onCreateSubmit}
          type="submit"
        >
          Create the room <ChevronRight fontSize="small" />
        </Button>
      </CreateForm>
    </>
  );
};
