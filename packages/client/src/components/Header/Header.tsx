import React, { FC, useState } from 'react';
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

import { GameUrl } from '~/components/GameUrl';
import { useStores } from '~/hooks';

import { HeaderContainer, MobileMenu, Title } from './header.styles';

export const Header: FC<{}> = observer(() => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isConfirmHomeModalOpen, setIsConfirmHomeModalOpen] = useState<boolean>(
    false
  );
  const { uiStore } = useStores();

  function leaveGame(): void {
    uiStore.leaveRoom();
    closeMenu();
  }

  function onTitleClick(): void {
    if (uiStore.roomId) {
      setIsConfirmHomeModalOpen(true);
    } else {
      leaveGame();
    }
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
            {uiStore.roomId && (
              <>
                <Grid item md={6}>
                  <GameUrl />
                </Grid>
              </>
            )}
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
          {uiStore.roomId && (
            <ListItem>
              <GameUrl />
            </ListItem>
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
