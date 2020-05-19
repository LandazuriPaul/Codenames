import React, { FC } from 'react';

import { TeamChatMessage } from '@codenames/domain';

import { useStores } from '~/hooks';

import { MessageList } from './MessageList';

export const TeamMessageList: FC<{}> = () => {
  const { gameStore } = useStores();

  return (
    <MessageList teamColor={gameStore.userColor} messageList={messageList} />
  );
};

const messageList: TeamChatMessage[] = [
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    text: 'Message privé !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
];
