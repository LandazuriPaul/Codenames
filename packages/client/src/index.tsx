import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import 'mobx-react-lite/batchingForReactDom';

import { App } from '~/components/App';
import { APP_ROOT } from '~/config';
import { SnackbarProvider } from '~/contexts';
import { StoresProvider } from '~/stores';
import { DefaultTheme, useGlobalStyles } from '~/styles';

const rootElement = document.getElementById(APP_ROOT);

function ReactApp(): JSX.Element {
  useGlobalStyles();

  return (
    <ThemeProvider theme={DefaultTheme}>
      <StoresProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </StoresProvider>
    </ThemeProvider>
  );
}

render(<ReactApp />, rootElement);
