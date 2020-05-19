/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, {
  ChangeEvent,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Tooltip } from '@material-ui/core';
import { AllInclusive, GroupWork } from '@material-ui/icons';

import { UserColor, UserTeam } from '@codenames/domain';

import { useStores } from '~/hooks';

import { GlobalMessageList } from './GlobalMessageList';
import { TeamMessageList } from './TeamMessageList';
import { MessageInput } from './MessageInput';

import { ChatContainer, ChatTabs } from './chat.styles';

export const Chat: FC<{}> = observer(() => {
  const globalRef = useRef<HTMLDivElement>();
  const teamRef = useRef<HTMLDivElement>();
  const { gameStore } = useStores();

  const isTabsEnabled =
    gameStore.userTeam !== UserTeam.Observer && !gameStore.isSpyMaster;

  return (
    <ChatContainer elevation={5} square>
      <GlobalMessageList forwardRef={globalRef} />
      <TeamMessageList forwardRef={teamRef} />
      {isTabsEnabled && (
        <TabsHandler
          globalRef={globalRef}
          teamRef={teamRef}
          userColor={gameStore.userColor}
        />
      )}
      <MessageInput />
    </ChatContainer>
  );
});

interface TabsHandler {
  userColor: UserColor;
  globalRef: MutableRefObject<HTMLDivElement>;
  teamRef: MutableRefObject<HTMLDivElement>;
}

const TabsHandler: FC<TabsHandler> = ({ globalRef, teamRef, userColor }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    globalRef.current.scrollTop = globalRef.current.scrollHeight;
  }, [globalRef]);

  function handleChangeTab(event: ChangeEvent<{}>, newValue: number): void {
    event.preventDefault();
    setActiveTab(newValue);
    if (newValue === 0) {
      globalRef.current.style.display = 'block';
      teamRef.current.style.display = 'none';
      globalRef.current.scrollTop = globalRef.current.scrollHeight;
    } else {
      globalRef.current.style.display = 'none';
      teamRef.current.style.display = 'block';
      teamRef.current.scrollTop = teamRef.current.scrollHeight;
    }
  }

  return (
    <ChatTabs
      value={activeTab}
      onChange={handleChangeTab}
      variant="fullWidth"
      // @ts-ignore
      indicatorColor={userColor}
      role="message-filter"
      scrollButtons="off"
    >
      <Tooltip disableFocusListener placement="top" title="Full room">
        <Tab
          icon={
            // @ts-ignore
            <AllInclusive color={userColor} />
          }
        />
      </Tooltip>
      <Tooltip disableFocusListener placement="top" title="Team only">
        <Tab
          icon={
            // @ts-ignore
            <GroupWork color={userColor} />
          }
        />
      </Tooltip>
    </ChatTabs>
  );
};
