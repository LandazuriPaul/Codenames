import React, { FC, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { UserTeam } from '@codenames/domain';

import { useStores } from '~/hooks';

import { ChatControls } from './ChatControls';
import { GlobalMessageList } from './GlobalMessageList';
import { TeamMessageList } from './TeamMessageList';

import { ChatContainer } from './chat.styles';

export const Chat: FC<{}> = observer(() => {
  const globalChatRef = useRef<HTMLDivElement>();
  const teamChatRef = useRef<HTMLDivElement>();
  const { gameStore } = useStores();

  const isTabsEnabled =
    gameStore.userTeam !== UserTeam.Observer && !gameStore.isSpyMaster;

  return (
    <ChatContainer elevation={5} square>
      <GlobalMessageList forwardRef={globalChatRef} />
      <TeamMessageList forwardRef={teamChatRef} />
      <ChatControls
        globalChatRef={globalChatRef}
        teamChatRef={teamChatRef}
        isTabsEnabled={isTabsEnabled}
        userColor={gameStore.userColor}
      />
    </ChatContainer>
  );
});
