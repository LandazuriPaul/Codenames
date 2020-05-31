import React, { FC } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { cleanRoomIdFromInput } from '@codenames/lib';

import { Dashboard } from '~/components/Dashboard';
import { Layout } from '~/components/Layout';
import { UsernameForm } from '~/components/UsernameForm';
import { useStores } from '~/hooks';

export const Room: FC<{}> = observer(() => {
  const { roomId } = useParams();
  const { uiStore } = useStores();

  const cleanRoomId = cleanRoomIdFromInput(roomId);
  if (roomId !== cleanRoomId) {
    return <Redirect to={`/${cleanRoomId}`} />;
  }

  if (uiStore.token) {
    uiStore.joinRoom(roomId);
  }

  return (
    <Layout>
      {!uiStore.token && <UsernameForm roomId={roomId} />}
      <Dashboard />
    </Layout>
  );
});
