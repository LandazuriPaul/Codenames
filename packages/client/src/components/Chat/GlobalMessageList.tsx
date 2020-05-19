import React, { FC, MutableRefObject } from 'react';

import { GlobalChatMessage, UserTeam } from '@codenames/domain';
import { MessageList } from './MessageList';

interface GlobalMessageListProps {
  forwardRef: MutableRefObject<HTMLDivElement>;
}

export const GlobalMessageList: FC<GlobalMessageListProps> = ({
  forwardRef,
}) => {
  return <MessageList messageList={messageList} forwardRef={forwardRef} />;
};

const messageList: GlobalChatMessage[] = [
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
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: UserTeam.TeamA,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
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
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: UserTeam.TeamA,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
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
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: UserTeam.TeamA,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
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
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: UserTeam.TeamA,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
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
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: UserTeam.TeamA,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
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
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: UserTeam.TeamA,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
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
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: UserTeam.TeamA,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
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
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: UserTeam.TeamA,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
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
  {
    isSpyMaster: true,
    socketId: 'Zk1ZjkQKZ9eMvHLwAAAB',
    team: UserTeam.TeamA,
    text: 'Moi je peux pas voir votre petite convers',
    timestamp: 1589867874019,
    username: 'Robert',
  },
];