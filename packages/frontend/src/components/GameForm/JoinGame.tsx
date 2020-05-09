import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Autorenew, ChevronRight } from '@material-ui/icons';

import { gameFormContext } from '~/contexts';
import { AvailableLanguages } from '~/domain';
import { useStores } from '~/hooks';
import { cleanGameSeedFromInput } from '~/utils';

import { JoinButton, JoinRow, Jonction } from './joinGame.styles';

export const JoinGame: FC<{}> = observer(() => {
  const { gameStore } = useStores();
  const [newGameId, setNewGameId] = useState<string>('');
  const [isGameIdValid, setIsGameIdValid] = useState<boolean>(true);

  const { joinGame, newLang, setNewLang } = useContext(gameFormContext);

  function onJoinSubmit(
    event: MouseEvent<HTMLAnchorElement, MouseEvent> | FormEvent
  ): void {
    event.preventDefault();
    joinGame(newGameId);
  }

  function handleLangChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setNewLang(event.target.value as AvailableLanguages);
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

  function handleReset(): void {
    const generatedSeed = gameStore.getNewRandomSeed();
    setNewGameId(generatedSeed);
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
});
