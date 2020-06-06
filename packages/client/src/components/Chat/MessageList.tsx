import React, { FC, MutableRefObject, ReactElement } from 'react';

import { TeamColor } from '@codenames/domain';

import { GenericChatMessage, Message } from './Message';
import { MessageListContainer } from './messageList.styles';

interface MessageListProps {
  forwardRef: MutableRefObject<HTMLDivElement>;
  messageList: GenericChatMessage[];
  teamColor?: TeamColor;
}

export const MessageList: FC<MessageListProps> = ({
  messageList,
  teamColor,
  forwardRef,
}) => {
  function renderMessage({ ...message }: GenericChatMessage): ReactElement {
    const messageProps = { ...message };

    return (
      <Message
        key={`${message.username}@${message.timestamp}`}
        {...messageProps}
        senderColor={teamColor}
      />
    );
  }

  return (
    <MessageListContainer forwardRef={forwardRef}>
      <ul>{messageList.map(renderMessage)}</ul>
    </MessageListContainer>
  );
};
