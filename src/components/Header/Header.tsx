import React, { FC, useState } from 'react';
import { Button, Dialog, Typography } from '@material-ui/core';

import { Settings } from '~/components/Settings';

import { HeaderContainer } from './header.styles';

export const Header: FC<{}> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClickOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <HeaderContainer>
      <Typography component="h1" variant="h3">
        Codenames
      </Typography>
      <Button
        size="small"
        color="primary"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Settings
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={isOpen}
      >
        <Settings onClose={handleClose} />
      </Dialog>
    </HeaderContainer>
  );
};
