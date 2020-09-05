import React, { FC } from 'react';

import { Redirect, useLocation, useParams } from 'react-router-dom';

import { Board } from '~/components/Board';
import { Layout } from '~/components/Layout';
import { AvailableLanguages } from '~/domain';
import { useQuery, useStores } from '~/hooks';
import { Logger, cleanGameSeedFromInput } from '~/utils';

export const Game: FC<{}> = () => {
  const { lang, seed } = useParams();
  const { search } = useLocation();
  const query = useQuery();
  const { gameStore } = useStores();

  if (!(Object.values(AvailableLanguages) as string[]).includes(lang)) {
    return <Redirect to="/" />;
  }
  const cleanSeed = cleanGameSeedFromInput(seed);
  if (seed !== cleanSeed) {
    return (
      <Redirect
        to={{
          pathname: `/${lang}/${cleanSeed}`,
          search,
        }}
      />
    );
  }

  const urlDirty = query.get('dirty');
  let dirtyRatio: number;
  if (urlDirty === null) {
    dirtyRatio = 0;
  } else {
    const ratio = parseInt(urlDirty, 10);
    if (!isNaN(ratio)) {
      dirtyRatio = Math.min(Math.max(0, ratio), 100);
    } else {
      dirtyRatio = 100;
    }
  }

  Logger.log(`lang: ${lang} - seed: ${seed} - dirty level: ${dirtyRatio}`);

  gameStore.setLang(lang as AvailableLanguages);

  if (gameStore.dirtyRatio !== dirtyRatio) {
    gameStore.setDirtyRatio(dirtyRatio);
  }

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
