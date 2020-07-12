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
  const {
    roomStore,
    websocketStore: { token },
  } = useStores();

  const cleanRoomId = cleanRoomIdFromInput(roomId);
  if (roomId !== cleanRoomId) {
    return <Redirect to={`/${cleanRoomId}`} />;
  }

  if (roomStore.roomId && roomId !== roomStore.roomId) {
    return <Redirect to={`/${roomStore.roomId}`} />;
  }

  useEffect(() => {
    if (token) {
      roomStore.joinRoom(roomId);
    }
  }, [roomStore, token, roomId]);

  return (
    <Layout>
      {roomStore.roomId && token ? (
        <Dashboard />
      ) : (
        <UsernameForm roomId={roomId} />
      )}
    </Layout>
  );
});
