import React, { FC } from 'react';

import { HomeForm } from '~/components/HomeForm';
import { Layout } from '~/components/Layout';
import { useStores } from '~/hooks';

export const Home: FC<{}> = () => {
  const { uiStore } = useStores();

  if (uiStore.roomId) {
    uiStore.leaveRoom();
  }

  return (
    <Layout>
      <HomeForm />
    </Layout>
  );
};
