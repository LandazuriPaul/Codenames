import React, { FC } from 'react';

import { Message } from './Message';

import { MessageListContainer } from './messageList.styles';

const messageList = [
  {
    from: 'bibi',
    timestamp: 1589752519,
    text: 'Salut la compagnie !',
  },
  {
    from: 'pif',
    timestamp: 1589752530,
    text: 'Heeeey !',
  },
];

export const MessageList: FC<{}> = () => {
  return (
    <MessageListContainer>
      <ul>
        {messageList.map(message => (
          <Message key={message.timestamp} {...message} />
        ))}
      </ul>
    </MessageListContainer>
  );
};
