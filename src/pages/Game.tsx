import React, { FC } from 'react';

import { Redirect, useParams } from 'react-router-dom';

import { Board } from '~/components/Board';
import { Layout } from '~/components/Layout';
import { AvailableLanguages } from '~/domain';
import { useStores } from '~/hooks';
import { Logger, cleanGameSeedFromInput } from '~/utils';

export const Game: FC<{}> = () => {
  const { lang, seed } = useParams();
  const { gameStore } = useStores();

  if (!(Object.values(AvailableLanguages) as string[]).includes(lang)) {
    return <Redirect to="/" />;
  }
  const cleanSeed = cleanGameSeedFromInput(seed);
  if (seed !== cleanSeed) {
    return <Redirect to={`/${lang}/${cleanSeed}`} />;
  }

  Logger.log(`lang: ${lang} - seed: ${seed}`);

  gameStore.setLang(lang as AvailableLanguages);

  if (gameStore.seed !== seed) {
    gameStore.setSeed(seed);
  }

  gameStore.resetBoard();

  return (
    <Layout>
      <Board />
    </Layout>
  );
};
