import React, { FC } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { cleanRoomIdFromInput } from '@codenames/lib';

import { Board } from '~/components/Board';
import { Chat } from '~/components/Chat';
import { Layout } from '~/components/Layout';
import { UsernameDialog } from '~/components/UsernameDialog';
import { useStores } from '~/hooks';

export const Game: FC<{}> = observer(() => {
  const { roomId } = useParams();
  const { uiStore } = useStores();

  const cleanRoomId = cleanRoomIdFromInput(roomId);
  if (roomId !== cleanRoomId) {
    return <Redirect to={`/${cleanRoomId}`} />;
  }

  if (uiStore.username) {
    uiStore.joinRoom(roomId);
  }

  return (
    <Layout>
      {!uiStore.username && <UsernameDialog />}
      <Board />
      <Chat />
    </Layout>
  );
});
