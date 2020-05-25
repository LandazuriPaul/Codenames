import React, { FC, ReactText, createRef } from 'react';
import { SnackbarProvider as NotiProvider, ProviderContext } from 'notistack';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

export const SnackbarProvider: FC<{}> = ({ children }) => {
  const notistackRef = createRef<ProviderContext>();
  const onClickDismiss = (key: ReactText) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <NotiProvider
      ref={notistackRef}
      action={key => (
        <IconButton color="inherit" size="small" onClick={onClickDismiss(key)}>
          <Close fontSize="inherit" />
        </IconButton>
      )}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </NotiProvider>
  );
};
