import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Tabs, TabsProps, Theme } from '@material-ui/core';

import { UserColor } from '@codenames/domain';

interface ChatTabsProps extends TabsProps {
  userColor: UserColor;
}

export const ChatTabs = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ userColor, ...rest }: ChatTabsProps) => <Tabs {...rest} />
)(({ theme, userColor }: { theme: Theme; userColor: UserColor }) => ({
  background: theme.palette.grey[200],

  '& .MuiTabs-indicator': {
    background: `${
      userColor === 'default'
        ? theme.palette.grey[700]
        : theme.palette[userColor].main
    }`,
  },
}));
