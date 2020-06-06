import React, { FC, MutableRefObject } from 'react';

import { useStores } from '~/hooks';

import { MessageList } from './MessageList';

interface TeamMessageListProps {
  forwardRef: MutableRefObject<HTMLDivElement>;
}

export const TeamMessageList: FC<TeamMessageListProps> = ({ forwardRef }) => {
  const {
    chatStore: { teamMessageList },
    gameStore: { userColor },
  } = useStores();

  return (
    <MessageList
      teamColor={userColor}
      messageList={teamMessageList}
      forwardRef={forwardRef}
    />
  );
};
