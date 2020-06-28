import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Badge,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Group } from '@material-ui/icons';

import { useStores } from '~/hooks';

export const UserListInfo: FC<{}> = observer(() => {
  const {
    gameStore,
    uiStore: { userList },
  } = useStores();

  const userListTooltip = (
    <List dense disablePadding>
      {userList.map(user => (
        <ListItem key={user}>
          <Username variant="subtitle2">{user}</Username>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Tooltip title={userListTooltip} placement="bottom">
      <IconButton>
        <StyledBadge badgeContent={userList.length} color={gameStore.userColor}>
          <Group />
        </StyledBadge>
      </IconButton>
    </Tooltip>
  );
});

const Username = styled(Typography)({
  fontWeight: 'lighter',
});

const StyledBadge = styled(Badge)({
  fontSize: '0.7em',
  cursor: 'pointer',
});
