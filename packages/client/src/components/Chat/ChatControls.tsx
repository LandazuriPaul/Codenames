import React, {
  ChangeEvent,
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Tab, Tooltip } from '@material-ui/core';
import { AllInclusive, GroupWork } from '@material-ui/icons';

import { TeamColor } from '@codenames/domain';

import { chatControlsContext } from '~/contexts';

import { MessageInput } from './MessageInput';
import { ChatTabs } from './chatControls.styles';

interface ChatControlsProps {
  globalChatRef: MutableRefObject<HTMLDivElement>;
  isTabsEnabled: boolean;
  teamChatRef: MutableRefObject<HTMLDivElement>;
  userColor: TeamColor;
}

export const ChatControls: FC<ChatControlsProps> = ({
  globalChatRef,
  isTabsEnabled,
  teamChatRef,
  userColor,
}) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  return (
    <chatControlsContext.Provider
      value={{
        activeTab,
        globalChatRef,
        setActiveTab,
        teamChatRef,
        userColor,
      }}
    >
      {isTabsEnabled && <TabsHandler />}
      <MessageInput />
    </chatControlsContext.Provider>
  );
};

const TabsHandler: FC<{}> = () => {
  const {
    activeTab,
    globalChatRef,
    setActiveTab,
    teamChatRef,
    userColor,
  } = useContext(chatControlsContext);
  useEffect(() => {
    globalChatRef.current.scrollTop = globalChatRef.current.scrollHeight;
  }, [globalChatRef]);

  function handleChangeTab(event: ChangeEvent<{}>, newValue: 0 | 1): void {
    event.preventDefault();
    setActiveTab(newValue);
    if (newValue === 0) {
      globalChatRef.current.style.display = 'block';
      teamChatRef.current.style.display = 'none';
    } else {
      globalChatRef.current.style.display = 'none';
      teamChatRef.current.style.display = 'block';
    }
  }

  return (
    <ChatTabs
      value={activeTab}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onChange={handleChangeTab}
      variant="fullWidth"
      userColor={activeTab === 0 ? 'default' : userColor}
      role="chat-control"
      scrollButtons="off"
    >
      <Tooltip disableFocusListener placement="top" title="Full room">
        <Tab icon={<AllInclusive />} />
      </Tooltip>
      <Tooltip disableFocusListener placement="top" title="Team only">
        <Tab icon={<GroupWork />} />
      </Tooltip>
    </ChatTabs>
  );
};
