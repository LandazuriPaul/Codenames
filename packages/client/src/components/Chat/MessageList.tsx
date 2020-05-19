import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { ChatMessage, UserTeam } from '@codenames/domain';

import { useStores } from '~/hooks';

import { Message } from './Message';
import { MessageListContainer } from './messageList.styles';

interface MessageListProps {
  teamOnly?: boolean;
}

export const MessageList: FC<MessageListProps> = observer(
  ({ teamOnly = false }) => {
    const { gameStore } = useStores();
    let msgList;
    if (teamOnly) {
      msgList = messageList.filter(({ team }) => team === gameStore.userTeam);
    } else {
      msgList = messageList;
    }

    return (
      <MessageListContainer>
        <ul>
          {msgList.map(message => (
            <Message
              key={`${message.socketId}@${message.timestamp}`}
              {...message}
            />
          ))}
        </ul>
      </MessageListContainer>
    );
  }
);

const messageList: ChatMessage[] = [
  {
    socketId: 'Zk1ZcJlaMzAovHLwAAAB',
    team: UserTeam.TeamB,
    text: 'Heeeey !',
    timestamp: 1589867860806,
    username: 'Marcel',
  },
  {
    socketId: 'Zk1ZjkQKZKYSvHLwAAAB',
    team: UserTeam.TeamA,
    text:
      "Salut la compagnie ! Je vous envoie un très long message parce que j'ai plein de trucs à raconter",
    timestamp: 1589867871473,
    username: 'Étienne',
  },
  {
    socketId: 'p2j8RJlaMzAovHLwAAAB',
    team: UserTeam.Observer,
    text: 'Je regarde comment vous jouez bande de nuls !',
    timestamp: 1589867900032,
    username: 'Antoine',
  },
];
