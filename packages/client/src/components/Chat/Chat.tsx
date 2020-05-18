import React, { FC } from 'react';

import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

import { ChatContainer } from './chat.styles';

export const Chat: FC<{}> = () => {
  return (
    <ChatContainer elevation={5} square>
      <MessageList />
      <MessageInput />
    </ChatContainer>
  );
};
