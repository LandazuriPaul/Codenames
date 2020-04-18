import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import 'mobx-react-lite/batchingForReactDom';

import 'normalize.css';

import { App } from '~/components/App';
import { APP_ROOT } from '~/config';
import { StoresProvider } from '~/stores';
import { DefaultTheme, GlobalStyles } from '~/styles';

const rootElement = document.getElementById(APP_ROOT);
function ReactApp() {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={DefaultTheme}>
        <ThemeProvider theme={DefaultTheme}>
          <StoresProvider>
            <SnackbarProvider>
              <GlobalStyles />
              <App />
            </SnackbarProvider>
          </StoresProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
render(<ReactApp />, rootElement);
