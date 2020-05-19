/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { ChangeEvent, FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Tooltip } from '@material-ui/core';
import { AllInclusive, GroupWork } from '@material-ui/icons';

import { UserTeam } from '@codenames/domain';

import { useStores } from '~/hooks';

import { GlobalMessageList } from './GlobalMessageList';
import { TeamMessageList } from './TeamMessageList';
import { MessageInput } from './MessageInput';

import { ChatContainer, ChatTabs } from './chat.styles';

export const Chat: FC<{}> = observer(() => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { gameStore } = useStores();

  function handleChangeTab(event: ChangeEvent<{}>, newValue: number): void {
    setActiveTab(newValue);
  }

  const isTabsEnabled =
    gameStore.userTeam !== UserTeam.Observer && !gameStore.isSpyMaster;

  return (
    <ChatContainer elevation={5} square>
      {(!isTabsEnabled || activeTab === 0) && <GlobalMessageList />}
      {isTabsEnabled && activeTab === 1 && <TeamMessageList />}
      {isTabsEnabled && (
        <ChatTabs
          value={activeTab}
          onChange={handleChangeTab}
          variant="fullWidth"
          // @ts-ignore
          indicatorColor={gameStore.userColor}
          role="message-filter"
          scrollButtons="off"
        >
          <Tooltip disableFocusListener placement="top" title="Full room">
            <Tab
              icon={
                // @ts-ignore
                <AllInclusive color={gameStore.userColor} />
              }
            />
          </Tooltip>
          <Tooltip disableFocusListener placement="top" title="Team only">
            <Tab
              icon={
                // @ts-ignore
                <GroupWork color={gameStore.userColor} />
              }
            />
          </Tooltip>
        </ChatTabs>
      )}
      <MessageInput />
    </ChatContainer>
  );
});
