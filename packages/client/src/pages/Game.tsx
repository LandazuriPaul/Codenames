import React, { FC } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { cleanRoomIdFromInput } from '@codenames/lib';

import { Board } from '~/components/Board';
import { Chat } from '~/components/Chat';
import { Layout } from '~/components/Layout';
import { useStores } from '~/hooks';

export const Game: FC<{}> = () => {
  const { roomId } = useParams();
  const { uiStore } = useStores();

  const cleanRoomId = cleanRoomIdFromInput(roomId);
  if (roomId !== cleanRoomId) {
    return <Redirect to={`/${cleanRoomId}`} />;
  }

  uiStore.joinRoom(roomId);

  return (
    <Layout>
      <Board />
      <Chat />
    </Layout>
  );
};
