import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { DEFAULT_LANGUAGE } from '~/config';
import { useStores } from '~/hooks';

export const NewGame: FC<{}> = () => {
  const { gameStore } = useStores();

  const lang = gameStore.lang ? gameStore.lang : DEFAULT_LANGUAGE;
  const seed = gameStore.getNewRandomSeed();

  return <Redirect to={`/${lang}/${seed}`} />;
};
