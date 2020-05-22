import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Tabs, TabsProps, Theme } from '@material-ui/core';

import { UserColor } from '@codenames/domain';

import { getThemeUserColor } from '~/styles';

interface ChatTabsProps extends TabsProps {
  userColor: UserColor;
}

export const ChatTabs = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ userColor, ...rest }: ChatTabsProps) => <Tabs {...rest} />
)(({ theme, userColor }: { theme: Theme; userColor: UserColor }) => ({
  background: theme.palette.grey[200],

  '& .MuiButtonBase-root': {
    transition: '0.4s ease',

    '&[aria-selected="true"]': {
      background: getThemeUserColor(theme, userColor),
      color: theme.palette.primary.contrastText,
    },
  },

  '& .MuiTabs-indicator': {
    background: getThemeUserColor(theme, userColor),
  },
}));
