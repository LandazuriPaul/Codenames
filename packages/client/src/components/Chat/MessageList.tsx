import React, { FC, ReactElement, useRef, useEffect } from 'react';

import { UserColor } from '@codenames/domain';

import { GenericChatMessage, Message } from './Message';
import { MessageListContainer } from './messageList.styles';

interface MessageListProps {
  messageList: GenericChatMessage[];
  teamColor?: UserColor;
}

export const MessageList: FC<MessageListProps> = ({
  messageList,
  teamColor,
}) => {
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, []);

  function renderMessage({ ...message }: GenericChatMessage): ReactElement {
    const messageProps = { ...message };

    return (
      <Message
        key={`${message.socketId}@${message.timestamp}`}
        {...messageProps}
        senderColor={teamColor}
      />
    );
  }

  return (
    <MessageListContainer ref={containerRef}>
      <ul>{messageList.map(renderMessage)}</ul>
    </MessageListContainer>
  );
};
