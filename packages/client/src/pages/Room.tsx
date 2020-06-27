import React, { FC, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { cleanRoomIdFromInput } from '@codenames/lib';

import { Dashboard } from '~/components/Dashboard';
import { Layout } from '~/components/Layout';
import { UsernameForm } from '~/components/UsernameForm';
import { useStores } from '~/hooks';

export const Room: FC<{}> = observer(() => {
  const { roomId } = useParams();
  const { uiStore, websocketStore } = useStores();

  const cleanRoomId = cleanRoomIdFromInput(roomId);
  if (roomId !== cleanRoomId) {
    return <Redirect to={`/${cleanRoomId}`} />;
  }

  if (uiStore.roomId && roomId !== uiStore.roomId) {
    return <Redirect to={`/${uiStore.roomId}`} />;
  }

  useEffect(() => {
    if (websocketStore.token) {
      uiStore.joinRoom(roomId);
    }
  }, [uiStore, websocketStore, roomId]);

  return (
    <Layout>
      {websocketStore.token ? <Dashboard /> : <UsernameForm roomId={roomId} />}
    </Layout>
  );
});
