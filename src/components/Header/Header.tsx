import React, { FC } from 'react';

import { GameHandler } from '~/components/GameHandler';
import { MasterSwitch } from '~/components/MasterSwitch';

import { HeaderContainer, Title } from './header.styles';

export const Header: FC<{}> = () => (
  <HeaderContainer square component="header" elevation={1}>
    <Title component="h1" variant="h3">
      Codenames
    </Title>
    <GameHandler />
    <MasterSwitch />
  </HeaderContainer>
);
