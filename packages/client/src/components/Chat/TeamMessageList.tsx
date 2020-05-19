import React, { FC, MutableRefObject } from 'react';

import { TeamChatMessage } from '@codenames/domain';

import { useStores } from '~/hooks';

import { MessageList } from './MessageList';

interface TeamMessageListProps {
  forwardRef: MutableRefObject<HTMLDivElement>;
}

export const TeamMessageList: FC<TeamMessageListProps> = ({ forwardRef }) => {
  const { gameStore } = useStores();

  return (
    <MessageList
      teamColor={gameStore.userColor}
      messageList={messageList}
      forwardRef={forwardRef}
    />
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
