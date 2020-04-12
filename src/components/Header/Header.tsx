import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

import { GameHandler } from '~/components/GameHandler';
import { MasterSwitch } from '~/components/MasterSwitch';

import {
  Banner,
  ExternalButton,
  HeaderContainer,
  Title,
} from './header.styles';

export const Header: FC<{}> = () => (
  <HeaderContainer square component="header" elevation={1}>
    <Banner>
      <Title component="h1" variant="h3">
        Codenames
      </Title>
      <Typography variant="subtitle1">
        <ExternalButton>
          <a
            href="https://en.wikipedia.org/wiki/Codenames_(board_game)"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rules
          </a>
        </ExternalButton>
        <ExternalButton>
          <a
            href="https://github.com/LandazuriPaul/codenames"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </ExternalButton>
      </Typography>
    </Banner>
    <GameHandler />
    <MasterSwitch />
  </HeaderContainer>
);
