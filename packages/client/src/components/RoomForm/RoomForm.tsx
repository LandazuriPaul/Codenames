import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
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

import { RoomFormContainer } from './roomForm.styles';

interface RoomFormProps {
  isJoinForm?: boolean;
}

export const RoomForm: FC<RoomFormProps> = ({ isJoinForm = true }) => {
  const [newRoomId, setNewRoomId] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>();
  const history = useHistory();

  useEffect(() => {
    if (isJoinForm) {
      setNewRoomId('');
      inputRef.current.focus();
    } else {
      // TODO: API query to check if available
      setNewRoomId(getRandomUppercaseString());
    }
  }, [isJoinForm]);

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
        {isJoinForm ? 'Join' : 'Create'}&nbsp;a room
      </Typography>
      <RoomFormContainer
        noValidate
        autoComplete="off"
        onSubmit={onCreateSubmit}
      >
        <TextField
          label="Room ID"
          variant="outlined"
          value={newRoomId}
          onChange={handleRoomIdChange}
          error={newRoomId.length < 3}
          helperText={
            newRoomId.length < 3 ? (
              <Tooltip
                title="The room id has to be at least 3 characters long"
                placement="right"
              >
                <Typography variant="caption">Invalid room id</Typography>
              </Tooltip>
            ) : null
          }
          inputRef={inputRef}
          InputProps={{
            endAdornment: isJoinForm ? null : (
              <InputAdornment position="end">
                <Tooltip title="Generate new seed" placement="right">
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
          <>
            {isJoinForm ? 'Join the room' : 'Create the room'}
            &nbsp;
            <ChevronRight fontSize="small" />
          </>
        </Button>
      </RoomFormContainer>
    </>
  );
};
