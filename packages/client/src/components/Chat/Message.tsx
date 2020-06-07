import React, { FC, ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import { Tooltip, Typography } from '@material-ui/core';

import { BaseMessage, ChatMessage, GeneralMessage } from '~/domain';
import { useStores } from '~/hooks';
import { getTeamColor } from '~/utils';

import {
  InformationText,
  MessageContainer,
  MessageTooltipContainer,
  OwnText,
  Text,
  TooltipTime,
  Username,
} from './message.styles';

export const Message: FC<ChatMessage> = ({ type, isOwn = false, message }) => {
  let messageElement: ReactElement;

  if (type === 'information') {
    messageElement = <InformationMessage {...message} />;
  } else if (isOwn) {
    messageElement = <OwnMessage {...message} />;
  } else {
    messageElement = <OthersMessage {...(message as GeneralMessage)} />;
  }

  return <MessageContainer>{messageElement}</MessageContainer>;
};

const InformationMessage: FC<BaseMessage> = ({ text }) => {
  return (
    <InformationText variant="body2" align="center">
      {text}
    </InformationText>
  );
};

const OwnMessage: FC<BaseMessage> = observer(({ text }) => {
  const {
    gameStore: { userColor },
  } = useStores();
  return (
    <OwnText variant="body2" align="right" ownColor={userColor}>
      {text}
    </OwnText>
  );
});

const OthersMessage: FC<GeneralMessage> = observer(
  ({ isSpyMaster, team, text, timestamp, username }) => {
    const {
      gameStore: { userColor },
    } = useStores();
    return (
      <>
        <Tooltip
          placement="left"
          title={
            <MessageTooltip isSpyMaster={isSpyMaster} timestamp={timestamp} />
          }
        >
          <span>
            <Username
              isSpyMaster={isSpyMaster}
              senderColor={team ? getTeamColor(team) : userColor}
              variant="body2"
            >
              {username}
            </Username>
          </span>
        </Tooltip>
        <Text variant="body2">{text}</Text>
      </>
    );
  }
);

interface MessageTooltipProps {
  isSpyMaster: boolean;
  timestamp: number;
}

const MessageTooltip: FC<MessageTooltipProps> = ({
  isSpyMaster,
  timestamp,
}) => {
  return (
    <MessageTooltipContainer>
      {isSpyMaster && <Typography variant="caption">Spy Master</Typography>}
      <TooltipTime>{dayjs(timestamp).format('HH:mm:ss')}</TooltipTime>
    </MessageTooltipContainer>
  );
};
