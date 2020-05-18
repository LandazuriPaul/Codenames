import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Tooltip } from '@material-ui/core';

import {
  From,
  MessageContainer,
  Text,
  TooltipFrom,
  TooltipTime,
} from './message.styles';

interface MessageProps {
  from: string;
  text: string;
  timestamp: number;
}

export const Message: FC<MessageProps> = ({ from, text, timestamp }) => {
  return (
    <MessageContainer>
      <Tooltip
        placement="left"
        title={<MessageTooltip from={from} timestamp={timestamp} />}
      >
        <div>
          <From variant="caption">{from}</From>
        </div>
      </Tooltip>
      <Text variant="body2">{text}</Text>
    </MessageContainer>
  );
};

interface MessageTooltipProps {
  from: string;
  timestamp: number;
}

const MessageTooltip: FC<MessageTooltipProps> = ({ from, timestamp }) => {
  return (
    <div>
      <TooltipFrom>{from}</TooltipFrom>
      <TooltipTime>{dayjs(timestamp).format('HH:mm:ss')}</TooltipTime>
    </div>
  );
};
