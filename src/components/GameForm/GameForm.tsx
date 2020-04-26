import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { DEFAULT_LANGUAGE } from '~/config';
import { AvailableLanguages } from '~/domain';
import { useStores } from '~/hooks';

import { JoinGame } from './JoinGame';

import { Container, MainForm, NewGame } from './gameForm.styles';
import { gameFormContext } from '~contexts';

export const GameForm: FC<{}> = observer(() => {
  const history = useHistory();
  const { gameStore } = useStores();
  const { enqueueSnackbar } = useSnackbar();
  const currentLang = gameStore.lang ? gameStore.lang : DEFAULT_LANGUAGE;

  const [newLang, setNewLang] = useState<AvailableLanguages>(currentLang);

  function joinGame(gameId: string): void {
    history.push(`/${newLang}/${gameId}`);
    enqueueSnackbar('New game', { variant: 'info' });
  }

  return (
    <gameFormContext.Provider value={{ newLang, setNewLang, joinGame }}>
      <Container>
        <JoinGame />
        {/* TODO: <Typography variant="body2" align="center">
          or
        </Typography>
        <NewGame align="center" color="primary">
          <a>create a new game</a>
        </NewGame> */}
      </Container>
    </gameFormContext.Provider>
  );
});
