import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
} from '@material-ui/core';
import {
  Autorenew,
  ChevronRight,
  Close,
  Edit,
  FileCopy,
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import { AvailableLanguages } from '~/domain';
import { useStores } from '~/hooks';
import { Logger, cleanGameSeedFromInput } from '~/utils';

import { GameHandlerContainer, GameHandlerForm } from './gameHandler.styles';

export const GameHandler: FC<{}> = observer(() => {
  const { lang, seed } = useParams();
  const [newSeed, setNewSeed] = useState<string>(seed);
  const [newLang, setNewLang] = useState<AvailableLanguages>(
    lang as AvailableLanguages
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { gameStore } = useStores();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const currentUrl = `${window.location.origin}/${lang}/${seed}`;

  const isSetupRoomChanged = seed !== newSeed || lang !== newLang;

  useEffect(() => {
    function disableEditMode(e: KeyboardEvent): void {
      if (e.keyCode === 27) {
        setIsEditMode(false);
      }
    }
    if (isEditMode) {
      window.addEventListener('keydown', disableEditMode);
    }
    return () => {
      window.removeEventListener('keydown', disableEditMode);
    };
  }, [isEditMode]);

  function handleLangChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setNewLang(event.target.value as AvailableLanguages);
  }

  async function handleCopyGameURL(): Promise<void> {
    try {
      await navigator.clipboard.writeText(currentUrl);
      enqueueSnackbar('Game URL copied to clipboard', { variant: 'success' });
    } catch (error) {
      Logger.error(error);
      enqueueSnackbar('An error occured, try again please', {
        variant: 'error',
      });
    }
  }

  function handleSeedChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewSeed(cleanGameSeedFromInput(event.currentTarget.value));
  }

  function handleReset(): void {
    const generatedSeed = gameStore.getNewRandomSeed();
    setNewSeed(generatedSeed);
  }

  function onFormSubmit(
    event?: MouseEvent<HTMLAnchorElement, MouseEvent> | FormEvent
  ): void {
    if (event) {
      event.preventDefault();
    }
    if (isSetupRoomChanged) {
      history.push(`/${newLang}/${newSeed}`);
      setIsEditMode(false);
      enqueueSnackbar('New game!', { variant: 'info' });
    }
  }

  return (
    <GameHandlerContainer component="div">
      {isEditMode ? (
        <GameHandlerForm onSubmit={onFormSubmit}>
          <TextField
            variant="outlined"
            label="Language"
            value={newLang}
            onChange={handleLangChange}
            size="small"
            select
            color="secondary"
          >
            <MenuItem value={AvailableLanguages.English}>English</MenuItem>
            <MenuItem value={AvailableLanguages.French}>French</MenuItem>
          </TextField>
          &nbsp;&nbsp;
          <TextField
            value={newSeed}
            onChange={handleSeedChange}
            style={{
              maxWidth: '10em',
            }}
            variant="outlined"
            label="Game seed"
            size="small"
            color="secondary"
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
          &nbsp;&nbsp;
          <Button
            variant="contained"
            disabled={!isSetupRoomChanged}
            color={isSetupRoomChanged ? 'secondary' : 'default'}
            onClick={onFormSubmit}
            type="submit"
          >
            <ChevronRight fontSize="small" />
          </Button>
          &nbsp;&nbsp;
          <IconButton onClick={() => setIsEditMode(false)}>
            <Close fontSize="small" />
          </IconButton>
        </GameHandlerForm>
      ) : (
        <>
          <TextField
            value={seed}
            onChange={handleSeedChange}
            style={{
              maxWidth: '10em',
            }}
            size="small"
            variant="outlined"
            label="Codename seed"
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy room URL to clipboard">
                    <IconButton onClick={handleCopyGameURL} size="small">
                      <FileCopy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          &nbsp;&nbsp;
          <Tooltip title="Change game">
            <IconButton onClick={() => setIsEditMode(true)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </GameHandlerContainer>
  );
});
