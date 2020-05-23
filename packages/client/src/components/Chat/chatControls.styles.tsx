import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Tabs, TabsProps, Theme } from '@material-ui/core';

import { TeamColor } from '@codenames/domain';

import { getThemeTeamColor } from '~/styles';

interface ChatTabsProps extends TabsProps {
  userColor: TeamColor;
}

export const ChatTabs = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ userColor, ...rest }: ChatTabsProps) => <Tabs {...rest} />
)(({ theme, userColor }: { theme: Theme; userColor: TeamColor }) => ({
  background: theme.palette.grey[200],

  '& .MuiButtonBase-root': {
    transition: '0.4s ease',

    '&[aria-selected="true"]': {
      background: getThemeTeamColor(theme, userColor),
      color: theme.palette.primary.contrastText,
    },
  },

  '& .MuiTabs-indicator': {
    background: getThemeTeamColor(theme, userColor),
  },
}));
