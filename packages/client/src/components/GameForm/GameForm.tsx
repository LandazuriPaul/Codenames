import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';

import { AvailableLanguages } from '@codenames/domain';

import { gameFormContext } from '~/contexts';
import { useStores } from '~/hooks';

import { CreateRoom } from '~/components/CreateRoom';
import { Container } from './gameForm.styles';

export const GameForm: FC<{}> = observer(() => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { uiStore } = useStores();

  const [newLang, setNewLang] = useState<AvailableLanguages>(uiStore.lang);

  function joinGame(gameId: string): void {
    history.push(`/${newLang}/${gameId}`);
    enqueueSnackbar('New game', { variant: 'info' });
  }

  return (
    <gameFormContext.Provider value={{ newLang, setNewLang, joinGame }}>
      <Container>
        <CreateRoom />
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
