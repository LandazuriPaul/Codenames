import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Grid,
  Hidden,
  List,
  ListItem,
  Toolbar,
} from '@material-ui/core';
import { ChevronLeft, Menu } from '@material-ui/icons';

import { GameHandler } from '~/components/GameHandler';
import { MasterSwitch } from '~/components/MasterSwitch';
import { useStores } from '~/hooks';

import { HeaderContainer, MobileMenu, Title } from './header.styles';

export const Header: FC<{}> = observer(() => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isConfirmHomeModalOpen, setIsConfirmHomeModalOpen] = useState<boolean>(
    false
  );
  const history = useHistory();
  const { uiStore } = useStores();

  function leaveGame(): void {
    history.push('/');
  }

  function onTitleClick(): void {
    // TODO
    // if (uiStore.isInGame) {
    //   setIsConfirmHomeModalOpen(true);
    // } else {
    leaveGame();
    // }
  }

  function handleConfirmHomeModalClose(): void {
    setIsConfirmHomeModalOpen(false);
  }

  function openMenu(): void {
    setIsMenuOpen(true);
  }

  function closeMenu(): void {
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
              <Title component="h1" variant="h4" onClick={onTitleClick}>
                Codenames
              </Title>
            </Grid>
            <Hidden smDown>
              {uiStore.isInGame && (
                <>
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
                </>
              )}
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
          {uiStore.isInGame && (
            <>
              <ListItem>
                <MasterSwitch />
              </ListItem>
              <ListItem>
                <GameHandler />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <Dialog
        open={isConfirmHomeModalOpen}
        onClose={handleConfirmHomeModalClose}
      >
        <DialogTitle>Leave game?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure to leave the game?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmHomeModalClose}
            color="primary"
            autoFocus
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={leaveGame} color="primary">
            Leave game
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
