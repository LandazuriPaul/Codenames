import React, { FC, MutableRefObject, ReactElement } from 'react';

import { TeamColor } from '@codenames/domain';

import { ChatMessage } from '~/domain';

import { Message } from './Message';
import { MessageListContainer } from './messageList.styles';

interface MessageListProps {
  forwardRef: MutableRefObject<HTMLDivElement>;
  messageList: ChatMessage[];
}

export const MessageList: FC<MessageListProps> = ({
  messageList,
  forwardRef,
}) => {
  function renderMessage({ ...chatMessage }: ChatMessage): ReactElement {
    return <Message key={chatMessage.message.timestamp} {...chatMessage} />;
  }

  return (
    <MessageListContainer forwardRef={forwardRef}>
      <ul>{messageList.map(renderMessage)}</ul>
    </MessageListContainer>
  );
};
