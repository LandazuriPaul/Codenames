import React, { FC, MutableRefObject } from 'react';
import { observer } from 'mobx-react-lite';

import { useStores } from '~/hooks';

import { MessageList } from './MessageList';

interface TeamMessageListProps {
  forwardRef: MutableRefObject<HTMLDivElement>;
}

export const TeamChatMessageList: FC<TeamMessageListProps> = observer(
  ({ forwardRef }) => {
    const {
      chatStore: { teamChatMessageList },
    } = useStores();

    return (
      <MessageList messageList={teamChatMessageList} forwardRef={forwardRef} />
    );
  }
);
