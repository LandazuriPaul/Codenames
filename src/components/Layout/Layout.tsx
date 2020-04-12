import React, { FC } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { AvailableLanguages } from '~/domain';
import { useStores } from '~/hooks';
import { Logger } from '~/utils';

import { Header } from '~/components/Header';
import { Board } from '~/components/Board';

export const Layout: FC<{}> = () => {
  const { lang, seed } = useParams();
  const { gameStore } = useStores();

  Logger.log(`lang: ${lang} - seed: ${seed}`);

  const AvailableLanguagesValues = Object.values(AvailableLanguages) as any;
  if (!AvailableLanguagesValues.includes(lang)) {
    return <Redirect to="/" />;
  }
  gameStore.setLang(lang as AvailableLanguages);

  if (gameStore.seed !== seed) {
    gameStore.setSeed(seed);
  }

  gameStore.resetBoard();
  return (
    <>
      <Header />
      <Board />
    </>
  );
};
