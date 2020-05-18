import React, { FC } from 'react';

import { Message } from './Message';

import { MessageListContainer } from './messageList.styles';

const messageList = [
  {
    from: 'bibiqmsdlkfjqsmdklfjqmskdlfj',
    timestamp: 1589752519,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
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
