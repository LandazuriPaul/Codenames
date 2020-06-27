import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { HomeForm } from '~/components/HomeForm';
import { Layout } from '~/components/Layout';
import { useStores } from '~/hooks';

export const Home: FC<{}> = () => {
  const { uiStore } = useStores();

  if (uiStore.roomId) {
    return <Redirect to={`/${uiStore.roomId}`} />;
  }

  return (
    <Layout>
      <HomeForm />
    </Layout>
  );
};
