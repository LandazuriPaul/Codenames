import React, { FC, MutableRefObject } from 'react';
import { observer } from 'mobx-react-lite';

import { useStores } from '~/hooks';

import { MessageList } from './MessageList';

interface GlobalMessageListProps {
  forwardRef: MutableRefObject<HTMLDivElement>;
}

export const GlobalMessageList: FC<GlobalMessageListProps> = observer(
  ({ forwardRef }) => {
    const {
      chatStore: { globalMessageList },
    } = useStores();

    return (
      <MessageList messageList={globalMessageList} forwardRef={forwardRef} />
    );
  }
);
