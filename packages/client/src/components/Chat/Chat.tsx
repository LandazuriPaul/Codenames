import React, { FC, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { Team } from '@codenames/domain';

import { useStores } from '~/hooks';

import { ChatControls } from './ChatControls';
import { GeneralChatMessageList } from './GeneralChatMessageList';
import { TeamChatMessageList } from './TeamChatMessageList';

import { ChatContainer, MessageListContainer } from './chat.styles';

export const Chat: FC<{}> = observer(() => {
  const globalChatRef = useRef<HTMLDivElement>();
  const teamChatRef = useRef<HTMLDivElement>();
  const { gameStore } = useStores();

  const isTabsEnabled =
    gameStore.userTeam !== Team.Observer && !gameStore.isSpyMaster;

  return (
    <ChatContainer elevation={5} square>
      <MessageListContainer>
        <GeneralChatMessageList forwardRef={globalChatRef} />
        <TeamChatMessageList forwardRef={teamChatRef} />
      </MessageListContainer>
      <ChatControls
        globalChatRef={globalChatRef}
        teamChatRef={teamChatRef}
        isTabsEnabled={isTabsEnabled}
        userColor={gameStore.userColor}
      />
    </ChatContainer>
  );
});
