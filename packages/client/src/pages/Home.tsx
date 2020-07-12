import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { HomeForm } from '~/components/HomeForm';
import { Layout } from '~/components/Layout';
import { useStores } from '~/hooks';

export const Home: FC<{}> = () => {
  const { roomStore } = useStores();

  if (roomStore.roomId) {
    return <Redirect to={`/${roomStore.roomId}`} />;
  }

  return (
    <Layout>
      <HomeForm />
    </Layout>
  );
};
