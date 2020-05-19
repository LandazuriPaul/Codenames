import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Tooltip, Typography } from '@material-ui/core';

import { ChatMessage } from '@codenames/domain';

import { getTeamColor } from '~/utils';

import { MessageContainer, TooltipTime, Username } from './message.styles';

type MessageProps = Omit<ChatMessage, 'socketId'>;

export const Message: FC<MessageProps> = ({
  team,
  text,
  timestamp,
  username,
}) => {
  return (
    <MessageContainer>
      <Tooltip
        placement="left"
        title={<MessageTooltip timestamp={timestamp} />}
      >
        <span>
          <Username senderColour={getTeamColor(team)} variant="caption">
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
  timestamp: number;
}

const MessageTooltip: FC<MessageTooltipProps> = ({ timestamp }) => {
  return <TooltipTime>{dayjs(timestamp).format('HH:mm:ss')}</TooltipTime>;
};
