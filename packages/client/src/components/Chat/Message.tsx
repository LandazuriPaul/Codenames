import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Tooltip, Typography } from '@material-ui/core';

import { TeamChatMessage, UserColor, UserTeam } from '@codenames/domain';

import { getTeamColor } from '~/utils';

import {
  MessageContainer,
  MessageTooltipContainer,
  TooltipTime,
  Username,
} from './message.styles';

export interface GenericChatMessage extends TeamChatMessage {
  senderColor?: UserColor;
  isSpyMaster?: boolean;
  team?: UserTeam;
}

type MessageProps = Omit<GenericChatMessage, 'socketId'>;

export const Message: FC<MessageProps> = ({
  isSpyMaster = false,
  senderColor,
  team,
  text,
  timestamp,
  username,
}) => {
  return (
    <MessageContainer>
      <Tooltip
        placement="left"
        title={
          <MessageTooltip isSpyMaster={isSpyMaster} timestamp={timestamp} />
        }
      >
        <span>
          <Username
            isSpyMaster={isSpyMaster}
            senderColor={senderColor || getTeamColor(team)}
            variant="caption"
          >
            {username}
          </Username>
        </span>
      </Tooltip>
      <Typography component="span" variant="body2">
        {text}
      </Typography>
    </MessageContainer>
  );
};

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
