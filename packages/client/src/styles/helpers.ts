import { Theme } from '@material-ui/core';

import { UserColor } from '@codenames/domain';

export function getThemeUserColor(theme: Theme, userColor: UserColor): string {
  return userColor === 'default'
    ? theme.palette.grey[700]
    : theme.palette[userColor].main;
}
