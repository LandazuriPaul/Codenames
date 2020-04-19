import React, { FC, useState } from 'react';
import {
  Drawer,
  Grid,
  Hidden,
  Button,
  List,
  ListItem,
  Toolbar,
} from '@material-ui/core';
import { ChevronLeft, Menu } from '@material-ui/icons';

import { GameHandler } from '~/components/GameHandler';
import { MasterSwitch } from '~/components/MasterSwitch';

import { HeaderContainer, MobileMenu, Title } from './header.styles';

export const Header: FC<{}> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <HeaderContainer position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Hidden mdUp>
              <Grid container item xs={1} spacing={2}>
                <MobileMenu
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={openMenu}
                >
                  <Menu />
                </MobileMenu>
              </Grid>
            </Hidden>
            <Grid item md={3} xs={11}>
              <Title component="h1" variant="h4">
                Codenames
              </Title>
            </Grid>
            <Hidden smDown>
              <Grid item md={6}>
                <GameHandler />
              </Grid>
              <Grid
                container
                item
                md={3}
                justify="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <MasterSwitch />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </HeaderContainer>
      <Drawer anchor="left" open={isMenuOpen} onClose={closeMenu}>
        <List>
          <ListItem>
            <Button onClick={closeMenu}>
              <ChevronLeft /> Back
            </Button>
          </ListItem>
          <ListItem>
            <MasterSwitch />
          </ListItem>
          <ListItem>
            <GameHandler />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
