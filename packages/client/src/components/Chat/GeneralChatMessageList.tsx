import React, { FC, MutableRefObject } from 'react';
import { observer } from 'mobx-react-lite';

import { useStores } from '~/hooks';

import { MessageList } from './MessageList';

interface GeneralMessageListProps {
  forwardRef: MutableRefObject<HTMLDivElement>;
}

export const GeneralChatMessageList: FC<GeneralMessageListProps> = observer(
  ({ forwardRef }) => {
    const {
      chatStore: { generalChatMessageList },
    } = useStores();

    return (
      <MessageList
        messageList={generalChatMessageList}
        forwardRef={forwardRef}
      />
    );
  }
);
