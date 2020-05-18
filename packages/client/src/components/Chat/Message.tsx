import React, { FC } from 'react';

interface MessageProps {
  from: string;
  text: string;
  timestamp: number;
}

export const Message: FC<MessageProps> = ({ from, text, timestamp }) => {
  return (
    <li>
      {timestamp} - {from}: {text}
    </li>
  );
};
