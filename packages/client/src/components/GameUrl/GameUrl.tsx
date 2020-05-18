import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IconButton, InputAdornment, Tooltip } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import { Logger } from '~/utils';

import { GameHandlerContainer, UrlField } from './gameUrl.styles';

export const GameUrl: FC<{}> = observer(() => {
  const { roomId } = useParams();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const currentUrl = `${window.location.origin}/${roomId}`;

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

  return (
    <GameHandlerContainer component="div">
      <UrlField
        value={roomId}
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
    </GameHandlerContainer>
  );
});
