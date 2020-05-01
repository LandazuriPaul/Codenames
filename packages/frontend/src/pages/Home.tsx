import React, { FC } from 'react';

import { GameForm } from '~/components/GameForm';
import { Layout } from '~/components/Layout';
import { useStores } from '~/hooks';

export const Home: FC<{}> = () => {
  const { uiStore } = useStores();

  uiStore.setIsInGame(false);

  return (
    <Layout>
      <GameForm />
    </Layout>
  );
};
