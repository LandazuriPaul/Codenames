import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from '@material-ui/core';

import { DEFAULT_LANGUAGE } from '~/config';
import { AvailableLanguages } from '~/domain';
import { useStores } from '~/hooks';

import { JoinGame } from './JoinGame';

import { Container, MainForm, NewGame } from './gameForm.styles';
import { gameFormContext } from '~contexts';

export const GameForm: FC<{}> = observer(() => {
  const { gameStore } = useStores();
  const currentLang = gameStore.lang ? gameStore.lang : DEFAULT_LANGUAGE;

  const [newLang, setNewLang] = useState<AvailableLanguages>(currentLang);

  return (
    <gameFormContext.Provider value={{ newLang, setNewLang }}>
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
