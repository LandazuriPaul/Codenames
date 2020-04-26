import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import { MenuItem, TextField, Tooltip, Typography } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

import { gameFormContext } from '~/contexts';
import { AvailableLanguages } from '~/domain';
import { cleanGameSeedFromInput } from '~/utils';

import { JoinButton, JoinRow, Jonction } from './joinGame.styles';

export const JoinGame: FC<{}> = () => {
  const [newGameId, setNewGameId] = useState<string>('');
  const [isGameIdValid, setIsGameIdValid] = useState<boolean>(true);

  const history = useHistory();
  const { newLang, setNewLang } = useContext(gameFormContext);

  function onJoinSubmit(
    event: MouseEvent<HTMLAnchorElement, MouseEvent> | FormEvent
  ): void {
    event.preventDefault();
    history.push(`/${newLang.toLowerCase()}/${newGameId}`);
  }

  function handleLangChange(event): void {
    setNewLang(event.target.value);
  }

  function handleGameIdChange(event: ChangeEvent<HTMLInputElement>): void {
    const gameId = cleanGameSeedFromInput(event.target.value);
    setNewGameId(gameId);
    if (gameId.length < 3) {
      setIsGameIdValid(false);
    } else {
      setIsGameIdValid(true);
    }
  }

  return (
    <>
      <Typography
        align="center"
        variant="h4"
        component="h4"
        color="textSecondary"
      >
        Join a game
      </Typography>
      <form noValidate autoComplete="off" onSubmit={onJoinSubmit}>
        <JoinRow>
          <TextField
            variant="outlined"
            label="Language"
            value={newLang}
            onChange={handleLangChange}
            select
            helperText={
              <Typography variant="caption">Game language</Typography>
            }
          >
            <MenuItem value={AvailableLanguages.English}>English</MenuItem>
            <MenuItem value={AvailableLanguages.French}>French</MenuItem>
          </TextField>
          <Jonction>&#8212;</Jonction>
          <TextField
            label="Game ID"
            variant="outlined"
            autoFocus
            value={newGameId}
            onChange={handleGameIdChange}
            error={!isGameIdValid}
            helperText={
              isGameIdValid ? (
                <Typography variant="caption">
                  Ask the host for the game seed
                </Typography>
              ) : (
                <Tooltip title="The game seed has to be at least 3 characters long">
                  <Typography variant="caption">Invalid game seed</Typography>
                </Tooltip>
              )
            }
          />
        </JoinRow>
        <JoinRow>
          <JoinButton
            variant="contained"
            disabled={newGameId.length < 3 || !isGameIdValid}
            color="secondary"
            onClick={onJoinSubmit}
            type="submit"
          >
            Join the game <ChevronRight fontSize="small" />
          </JoinButton>
        </JoinRow>
      </form>
    </>
  );
};
