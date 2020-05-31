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
import { useMutation } from 'react-query';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Autorenew, ChevronRight, Info } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import { cleanRoomIdFromInput, getRandomUppercaseString } from '@codenames/lib';

import { Loading } from '~/components/elements';
import { isRoomUsed } from '~/queries';
import { Logger } from '~/utils';

import { RoomFormContainer } from './roomForm.styles';

interface RoomFormProps {
  isJoinForm?: boolean;
}

export const RoomForm: FC<RoomFormProps> = ({ isJoinForm = true }) => {
  const [newRoomId, setNewRoomId] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [checkForRoomAvailability, { status }] = useMutation(isRoomUsed);

  useEffect(() => {
    if (isJoinForm) {
      setNewRoomId('');
      inputRef.current.focus();
    } else {
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

  async function onCreateSubmit(
    event: MouseEvent<HTMLAnchorElement, MouseEvent> | FormEvent
  ): Promise<void> {
    event.preventDefault();
    if (newRoomId.length < 3) {
      return;
    }
    try {
      const alreadyExists = await checkForRoomAvailability(newRoomId);
      if (!alreadyExists) {
        history.push(`/${newRoomId}`);
      } else {
        enqueueSnackbar(
          'The room is already used. Please chose another room ID.',
          { variant: 'warning' }
        );
      }
    } catch (err) {
      Logger.log(err);
      enqueueSnackbar('An unknown error occurred, please try again.', {
        variant: 'error',
      });
    }
  }

  return (
    <>
      <Typography
        align="center"
        variant="h4"
        component="h4"
        color={isJoinForm ? 'primary' : 'secondary'}
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
          inputRef={inputRef}
          disabled={status === 'loading'}
          InputProps={{
            endAdornment: isJoinForm ? (
              <Tooltip title="Ask your host for the room ID">
                <IconButton size="small">
                  <Info fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
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
          disabled={newRoomId.length < 3 || status === 'loading'}
          color={isJoinForm ? 'primary' : 'secondary'}
          onClick={onCreateSubmit}
          type="submit"
        >
          <>
            {isJoinForm ? 'Join the room' : 'Create the room'}
            &nbsp;
            {status === 'loading' ? (
              <Loading size="1.5em" />
            ) : (
              <ChevronRight fontSize="small" />
            )}
          </>
        </Button>
      </RoomFormContainer>
    </>
  );
};
